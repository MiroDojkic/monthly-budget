import fecha from 'fecha';
import get from 'lodash/get';
import formats from './datetimes';

const getMonthKey = date => fecha.format(date, formats.TRUNC_TO_MONTH);
const defaultTransaction = { total: 0, incomeTotal: 0, expenses: [] };

const getTransactionByDate = (transactions, date) =>
  get(transactions, `${date && getMonthKey(date)}`, defaultTransaction);

export default getTransactionByDate;
