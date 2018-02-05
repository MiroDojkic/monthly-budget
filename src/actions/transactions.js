import * as React from 'react';
import get from 'lodash/get';
import api from '../util/api';

const retentionTime = 600000; // 10 minutes in ms

export default store => ({
  loadByDate: (state, datefilter) => {
    const transactions = get(state, 'transactions');
    const lastUpdatedAt = get(transactions, 'updatedAt');
    const cacheIsExpired =
      !lastUpdatedAt || lastUpdatedAt - new Date() > retentionTime;

    if (!navigator.onLine || !cacheIsExpired) {
      return;
    }

    store.setState({
      transactions: {
        ...transactions,
        loading: true
      }
    });

    return api
      .getAll('user_transactions_by_date', {
        userid: 1,
        datefilter
      })
      .then(result => ({
        ...transactions,
        transactions: [...get(transactions, 'transactions', []), ...result],
        updatedAt: new Date(),
        loading: false
      }))
      .catch(error => ({
        transactions: {
          ...transactions,
          loading: false
        },
        error: error
      }));
  }
});
