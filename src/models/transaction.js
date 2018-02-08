import * as L from 'partial.lenses';
import { isAppliedToMonth } from '../util/transactions';

const Transaction = {
  Type: { income: 'income', expense: 'expense' },

  byMonth: date => L.filter(transaction => isAppliedToMonth(transaction, date)),

  byType: type => L.filter(L.get(['type', L.is(type)])),

  sum: L.sum([L.elems, 'value']),

  byId: id => L.find(L.get(['id', L.is(id)]))
};

export default Transaction;
