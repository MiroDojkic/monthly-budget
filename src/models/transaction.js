import * as L from 'partial.lenses';
import { isAppliedToMonth } from '../util/transactions';

const Transaction = {
  default: { total: 0, incomeTotal: 0, expenses: [] },

  byMonth: date => L.filter(transaction => isAppliedToMonth(transaction, date)),

  byId: id => L.find(transaction => transaction.id === id)
};

export default Transaction;
