import * as React from 'react';
import get from 'lodash/get';
import fecha from 'fecha';
import { getUpdatedAt } from '../selectors/transactions';
import api from '../util/api';
import formats from '../util/datetimes';

const retentionTime = 600000; // 10 minutes in ms

export default store => ({
  loadByDate: (state, datefilter) => {
    const monthKey = fecha.format(datefilter, formats.TRUNC_TO_MONTH);
    const transactions = get(state, 'transactions');
    const lastUpdatedAt = getUpdatedAt(state)(monthKey);
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
      .get('user_transactions_by_date', {
        userid: 1,
        datefilter
      })
      .then(({ result }) => ({
        transactions: {
          ...transactions,
          loading: false,
          [monthKey]: {
            ...result,
            updatedAt: new Date()
          }
        }
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
