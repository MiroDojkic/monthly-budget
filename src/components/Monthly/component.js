import * as React from 'react';
import fecha from 'fecha';
import formats from '../../util/datetimes';

import s from './styles.scss';

const defaultMonth = fecha.format(Date.now(), formats.MONTH_LONG);

const Header = ({ month, total }) => (
  <header className={s.header}>
    <h1 className={s.title}>{month || defaultMonth}</h1>
    <div className={s.total}>
      <div className={s.value}>${total}</div>
      <div className={s.name}>leftover</div>
    </div>
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
