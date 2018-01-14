import * as React from 'react';
import fecha from 'fecha';
import Carousel from '../Carousel';
import Total from '../Total';
import formats from '../../util/datetimes';

import s from './styles.scss';

const getInitialDates = () => {
  const current = new Date();

  const previousMonth = current.getMonth() - 1;
  const nextMonth = current.getMonth() + 1;

  const previous = new Date(current);
  previous.setMonth(previousMonth);

  const next = new Date(current);
  next.setMonth(nextMonth);

  return [previous, current, next];
};

const renderMonth = date => (
  <div key={date}>
    <h5>{fecha.format(date, formats.MONTH_LONG)}</h5>
  </div>
);

const Header = ({ month, total }) => (
  <header className={s.header}>
    <Carousel
      items={getInitialDates()}
      renderItem={renderMonth}
      onChange={whatever => {
        console.log(whatever.getMonth());
      }}
      className={s.carousel}
    />
    <Total total={total} />
  </header>
);

const Listing = ({ incomeTotal, expenses }) => (
  <div className={s.listing}>
    <div className={s.listingItem}>
      <span className={s.incomeName}>income</span>
      <span className={s.value}>${incomeTotal}</span>
    </div>
    {expenses.map(({ name, value }) => (
      <div key={name} className={s.listingItem}>
        <span className={s.name}>{name}</span>
        <span className={s.value}>- ${value}</span>
      </div>
    ))}
  </div>
);

const Monthly = ({ month, expenses, incomeTotal, total }) => (
  <div className={s.monthly}>
    <Header month={month} total={total} />
    <Listing incomeTotal={incomeTotal} expenses={expenses} />
  </div>
);

export default Monthly;
