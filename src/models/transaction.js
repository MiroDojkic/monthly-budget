import * as L from 'partial.lenses';
import { truncateToMonth } from '../util/datetimes';

const isCreatedAtMonth = (transaction, date) =>
  truncateToMonth(new Date(transaction.created_at)) === truncateToMonth(date);

const isRepeatedOverMonth = (transaction, date) =>
  transaction.repeat === 'monthly' &&
  new Date(transaction.created_at) <= date &&
  new Date(transaction.repeat_until) >= date;

const isAppliedToMonth = date => transaction =>
  isCreatedAtMonth(transaction, date) || isRepeatedOverMonth(transaction, date);

const Transaction = {
  Type: { income: 'income', expense: 'expense' },

  byMonth: date => L.filter(isAppliedToMonth(date)),

  byType: type => L.filter(L.get(['type', L.is(type)])),

  sum: L.sum([L.elems, 'value']),

  byId: id => L.find(L.get(['id', L.is(id)]))
};

export default Transaction;
