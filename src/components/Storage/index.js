import * as React from 'react';
import fecha from 'fecha';
import localForage from 'localforage';
import omit from 'lodash/omit';
import get from 'lodash/get';
import api from '../../util/api';
import formats from '../../util/datetimes';

const retentionTime = 600000; // 10 minutes in ms

const initialState = {
  loading: false,
  error: null
};

export default class StorageProvider extends React.Component {
  componentWillMount() {
    this.getTransactions().then(transactions => {
      this.setState({
        ...initialState,
        ...transactions
      });
    });
  }

  setTransactions = () => localForage.setItem('transactions', this.state);
  getTransactions = () => localForage.getItem('transactions');

  loadByDate = datefilter => {
    const monthKey = fecha.format(datefilter, formats.TRUNC_TO_MONTH);
    const lastUpdatedAt = get(this.state, `[${monthKey}].updatedAt`);
    const cacheIsExpired =
      !lastUpdatedAt || lastUpdatedAt - new Date() > retentionTime;

    if (!navigator.onLine || !cacheIsExpired) {
      return;
    }

    this.setState({ loading: true }, () =>
      api
        .get('user_transactions_by_date', {
          userid: 1,
          datefilter
        })
        .then(({ result }) =>
          this.setState(state => ({
            ...state,
            loading: false,
            [monthKey]: {
              ...result,
              updatedAt: new Date()
            }
          }))
        )
        .then(this.setTransactions)
        .catch(error => {
          this.setState({
            loading: false,
            error: error
          });
        })
    );
  };

  render() {
    const props = {
      loadByDate: this.loadByDate,
      transactions: omit(this.state, ['loading', 'error']),
      loading: get(this.state, 'loading', false),
      error: get(this.state, 'error', null)
    };

    return React.cloneElement(this.props.children, props);
  }
}
