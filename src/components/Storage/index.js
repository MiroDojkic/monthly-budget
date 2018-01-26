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
    this.get('transactions').then(transactions => {
      this.setState({
        ...initialState,
        ...transactions
      });
    });
  }

  loadByDate = datefilter => {
    if (navigator.onLine) {
      const monthKey = fecha.format(datefilter, formats.TRUNC_TO_MONTH);

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
          .then(() => this.set('transactions', this.state))
          .catch(error => {
            this.setState({
              loading: false,
              error: error
            });
          })
      );
    }
  };

  sync = () => {
    if (navigator.onLine) {
      this.setState({ loading: true }, () =>
        this.get('user')
          .then(user => {
            if (!user) {
              // throw new Error('Cannot sync for non-authenticated user');
              return api.get('user_transactions', {
                userid: 1
              });
            } else {
              return api.get('user_transactions', {
                userid: user.id
              });
            }
          })
          .then(({ result }) => this.set('transactions', result))
          .then(values =>
            this.setState(state => ({
              ...state,
              ...values,
              loading: false
            }))
          )
          .catch(error => {
            this.setState({
              loading: false,
              error: error
            });
          })
      );
    }
  };

  getByDate = datefilter => {
    const monthKey = fecha.format(datefilter, formats.TRUNC_TO_MONTH);
    const transaction = get(this.state, `[${monthKey}]`);

    if (!transaction || transaction.updatedAt - new Date() > retentionTime) {
      this.loadByDate(datefilter);
    }
  };

  set = (key, value) => localForage.setItem(key, value);

  get = key => localForage.getItem(key);

  render() {
    const props = {
      syncByMonth: this.syncMonth,
      getByDate: this.getByDate,
      transactions: omit(this.state, ['loading', 'error']),
      loading: get(this.state, 'loading', false),
      error: get(this.state, 'error', null)
    };

    return React.cloneElement(this.props.children, props);
  }
}
