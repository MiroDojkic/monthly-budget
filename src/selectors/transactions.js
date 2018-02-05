import omit from 'lodash/omit';
import get from 'lodash/get';
import fecha from 'fecha';
import formats from '../util/datetimes';

const defaultTransaction = { total: 0, incomeTotal: 0, expenses: [] };
const getMonthKey = date => fecha.format(date, formats.TRUNC_TO_MONTH);

export const getTransactionByDate = state => date => {
  const transactions = get(state, `transactions.transactions`, []);

  const isInMonth = t => getMonthKey(t.createdAt) === getMonthKey(date);

  const isRepeatedOverMonth = t =>
    t.repeat === 'monthly' && t.created_at <= date && t.repeat_until >= date;

  return (
    transactions &&
    transactions.find(t => isInMonth(t) || isRepeatedOverMonth(t))
  );
};

export const getTransactions = state =>
  omit(get(state, 'transactions'), ['loading']);

export const getLoading = state => get(state, 'transactions.loading', false);

export const getError = state => get(state, 'transactions.error', null);
