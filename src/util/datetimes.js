import fecha from 'fecha';

const formats = {
  MONTH_LONG: 'MMMM',
  MONTH_SHORT: 'MM',
  TRUNC_TO_MONTH: 'YYYY-MM',
};

export const getPreviousMonth = current => {
  const truncated = fecha.format(current, formats.TRUNC_TO_MONTH);

  const currentMonth = current.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : current.getMonth() - 1;

  const previous = new Date(truncated);
  if (currentMonth === 0) {
    previous.setFullYear(current.getFullYear() - 1);
  }
  previous.setMonth(previousMonth);

  return previous;
};

export const getNextMonth = current => {
  const truncated = fecha.format(current, formats.TRUNC_TO_MONTH);

  const currentMonth = current.getMonth();
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;

  const next = new Date(truncated);
  if (currentMonth === 11) {
    next.setFullYear(current.getFullYear() + 1);
  }
  next.setMonth(nextMonth);

  return next;
};

export const getInitialDates = () => {
  const current = new Date();
  const previous = getPreviousMonth(current);
  const next = getNextMonth(current);

  return [previous, current, next];
};

export const truncateToMonth = date =>
  date ? fecha.format(date, formats.TRUNC_TO_MONTH) : undefined;

export default formats;
