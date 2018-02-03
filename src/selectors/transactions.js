import omit from 'lodash/omit';
import get from 'lodash/get';
import fecha from 'fecha';
import formats from '../util/datetimes';

const defaultTransaction = { total: 0, incomeTotal: 0, expenses: [] };
const getMonthKey = date => fecha.format(date, formats.TRUNC_TO_MONTH);

export const getTransactionByDate = state => date =>
  get(state, `transactions.${date && getMonthKey(date)}`, defaultTransaction);

export const getUpdatedAt = state => monthKey =>
  get(state, `transactions.[${monthKey}].updatedAt`);

export const getTransactions = state =>
  omit(get(state, 'transactions'), ['loading']);

export const getLoading = state => get(state, 'transactions.loading', false);

export const getError = state => get(state, 'transactions.error', null);
