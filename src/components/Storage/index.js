import * as React from 'react';
import localForage from 'localforage';
import api from '../../util/api';

export default class StorageProvider extends React.Component {
  componentWillMount() {
    if (navigator.onLine) {
      this.setState({ loading: true });
      this.sync();
    } else {
      this.get('transactions').then(transactions => {
        if (transactions) {
          this.setState(state => ({
            ...state,
            ...transactions
          }));
        }
      });
    }
  }

  state = {
    incomes: [],
    expenses: [],
    incomeTotal: 0,
    total: 0,
    loading: false
  };

  sync = () => {
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
      );
  };

  set = (key, value) => localForage.setItem(key, value);

  get = key => localForage.getItem(key);

  render() {
    const props = {
      syncStorage: this.sync,
      setItem: this.set,
      ...this.state
    };

    return React.cloneElement(this.props.children, props);
  }
}
