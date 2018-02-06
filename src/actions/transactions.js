import * as React from 'react';
import * as L from 'partial.lenses';
import api from '../util/api';
import Transaction from '../models/transaction';

// const retentionTime = 600000; // 10 minutes in ms

export const State = {
  root: 'transactions',
  transactions: ['transactions', 'transactions'],
  loading: ['transactions', 'loading', L.valueOr(false)],
  updatedAt: ['transactions', 'updatedAt'],
  error: ['transactions', 'error']
};

export default store => ({
  loadByDate: (state, datefilter) => {
    // const lastUpdatedAt = L.get(State.updatedAt, state);

    // const cacheExpired =
    //   !lastUpdatedAt || lastUpdatedAt - new Date() > retentionTime;

    if (!navigator.onLine) {
      return;
    }

    store.setState(L.set(State.loading, true, state));

    return api
      .getAll('user_transactions_by_date', {
        userid: 1,
        datefilter
      })
      .then(loaded =>
        L.modify(
          State.root,
          ({ transactions, loading, updatedAt, ...rest }) => ({
            ...rest,
            loading: false,
            updatedAt: new Date(),
            transactions: L.set(
              L.filter(t => L.get(Transaction.byId(t.id), loaded)),
              loaded,
              transactions
            )
          }),
          state
        )
      )
      .catch(error => L.set(State.error, error, state));
  }
});
