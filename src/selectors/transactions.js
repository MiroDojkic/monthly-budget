import * as L from 'partial.lenses';
import Transaction from '../models/transaction';
import { State } from '../actions/transactions';

export const getTransactionsByDate = state => date =>
  L.get([State.transactions, Transaction.byMonth(date)], state);

export const getLoading = L.get(State.loading);

export const getError = state => L.get(State.error);
