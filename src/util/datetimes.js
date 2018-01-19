const formats = {
  MONTH_LONG: 'MMMM',
  MONTH_SHORT: 'MM'
};

export const getPreviousMonth = current => {
  const currentMonth = current.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : current.getMonth() - 1;

  const previous = new Date(current);
  previous.setMonth(previousMonth);

  return previous;
};

export const getNextMonth = current => {
  const nextMonth = current.getMonth() + 1;
  const next = new Date(current);
  next.setMonth(nextMonth);

  return next;
};

export const getInitialDates = () => {
  const current = new Date();
  const previous = getPreviousMonth(current);
  const next = getNextMonth(current);

  return [previous, current, next];
};

export default formats;
