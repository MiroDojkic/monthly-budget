import * as React from 'react';
import * as L from 'partial.lenses';
import { getMonthKey } from '../util/optics';
import api from '../util/api';

const retentionTime = 600000; // 10 minutes in ms
const defaultTransaction = {
  total: 0,
  incomeTotal: 0,
  expenses: []
};

export const State = {
  updatedAt: date => ['transactions', getMonthKey(date), 'updatedAt'],

  loading: ['transactions', 'loading', L.valueOr(false)],

  error: 'error',

  transactionsByDate: date => [
    'transactions',
    getMonthKey(date),
    L.valueOr(defaultTransaction)
  ]
};

export default store => ({
  loadByDate: (state, transactionsDate) => {
    const lastUpdatedAt = L.get(State.updatedAt(transactionsDate), state);

    const cacheIsExpired =
      !lastUpdatedAt || lastUpdatedAt - new Date() > retentionTime;

    if (!navigator.onLine || !cacheIsExpired) {
      return;
    }

    store.setState(L.set(State.loading, true, state));

    return api
      .get('user_transactions_by_date', {
        userid: 1,
        datefilter: transactionsDate
      })
      .then(({ result }) =>
        L.set(
          State.transactionsByDate(transactionsDate),
          L.set('updatedAt', new Date(), result),
          state
        )
      )
      .catch(error => L.set(State.error, error), state);
  }
});
