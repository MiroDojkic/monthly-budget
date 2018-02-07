import * as React from 'react';
import * as L from 'partial.lenses';
import Transaction from '../models/transaction';
import api from '../util/api';
import { truncateToMonth } from '../util/datetimes';

const retentionTime = 600000; // 10 minutes in ms

export const State = {
  root: 'transactions',
  transactions: ['transactions', 'transactions'],
  loading: ['transactions', 'loading', L.valueOr(false)],
  cacheMap: ['transactions', 'cacheMap'],
  error: ['transactions', 'error'],

  intersectWith: transactions =>
    L.filter(({ id }) => L.get(Transaction.byId(id), transactions)),

  updateOnLoad: (cacheKey, loaded) => ({
    transactions,
    loading,
    cacheMap,
    error
  }) => ({
    error: null,
    loading: false,
    transactions: L.set(State.intersectWith(loaded), loaded, transactions),
    cacheMap: L.set(L.prop(cacheKey), new Date(), cacheMap)
  })
};

export default store => ({
  loadByDate: (state, datefilter) => {
    const cacheKey = L.get(L.normalize(truncateToMonth), datefilter);
    const lastUpdatedAt = L.get([State.cacheMap, cacheKey], state);

    const cacheExpired =
      !lastUpdatedAt || lastUpdatedAt - new Date() > retentionTime;

    if (!navigator.onLine || !cacheExpired) {
      return;
    }

    store.setState(L.set(State.loading, true, state));

    return api
      .getAll('user_transactions_by_date', {
        userid: 1,
        datefilter
      })
      .then(loaded =>
        L.modify(State.root, State.updateOnLoad(cacheKey, loaded), state)
      )
      .catch(error => L.set(State.error, error, state));
  }
});
