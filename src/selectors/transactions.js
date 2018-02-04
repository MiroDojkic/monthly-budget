import * as L from 'partial.lenses';
import { State } from '../actions/transactions';

export const getTransactionsByDate = state => date =>
  L.get(State.transactionsByDate(date), state);

export const getLoading = L.get(State.loading);

export const getError = L.get(State.error);
