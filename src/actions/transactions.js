import * as React from 'react';
import fecha from 'fecha';
import get from 'lodash/get';
import api from '../util/api';
import formats from '../util/datetimes';

const retentionTime = 600000; // 10 minutes in ms

export default store => ({
  loadByDate: (state, datefilter) => {
    const monthKey = fecha.format(datefilter, formats.TRUNC_TO_MONTH);
    const lastUpdatedAt = get(state, `[${monthKey}].updatedAt`);
    const cacheIsExpired =
      !lastUpdatedAt || lastUpdatedAt - new Date() > retentionTime;

    if (!navigator.onLine || !cacheIsExpired) {
      return;
    }

    store.setState({ loading: true });

    return api
      .get('user_transactions_by_date', {
        userid: 1,
        datefilter
      })
      .then(({ result }) => ({
        loading: false,
        [monthKey]: {
          ...result,
          updatedAt: new Date()
        }
      }))
      .catch(error => ({
        loading: false,
        error: error
      }));
  }
});
