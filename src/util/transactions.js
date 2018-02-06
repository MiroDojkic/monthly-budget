import { truncateToMonth } from './datetimes';

export const isCreatedAtMonth = (transaction, date) =>
  truncateToMonth(new Date(transaction.created_at)) === truncateToMonth(date);
export const isRepeatedOverMonth = (transactions, date) =>
  transactions.repeat === 'monthly' &&
  new Date(transactions.created_at) <= date &&
  new Date(transactions.repeat_until) >= date;

export const isAppliedToMonth = (transactions, date) =>
  isCreatedAtMonth(transactions, date) ||
  isRepeatedOverMonth(transactions, date);
