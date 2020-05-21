import * as L from 'partial.lenses';
import Transaction from '../models/transaction';
import { State } from '../actions/transactions';

export const getExpensesByDate = state => date =>
  L.get(
    [
      State.transactions,
      Transaction.byMonth(date),
      Transaction.byType(Transaction.Type.expense),
    ],
    state,
  );

export const getIncomeTotalByDate = state => date =>
  L.get(
    [
      State.transactions,
      Transaction.byMonth(date),
      Transaction.byType(Transaction.Type.income),
      Transaction.sum,
    ],
    state,
  );

const getExpenseTotalByDate = state => date =>
  L.get(
    [
      State.transactions,
      Transaction.byMonth(date),
      Transaction.byType(Transaction.Type.expense),
      Transaction.sum,
    ],
    state,
  );

export const getTotalByDate = state => date =>
  getIncomeTotalByDate(state)(date) - getExpenseTotalByDate(state)(date);

export const getLoading = L.get(State.loading);

export const getError = state => L.get(State.error);
