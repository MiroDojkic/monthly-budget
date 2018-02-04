import * as L from 'partial.lenses';
import { truncateDateToMonth } from './datetimes';

export const getMonthKey = date =>
  L.get(L.normalize(truncateDateToMonth), date);
