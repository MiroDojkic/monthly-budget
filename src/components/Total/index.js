import * as React from 'react';

import s from './styles.scss';

const Total = ({ total }) => (
  <div className={s.total}>
    <div className={s.value}>${total}</div>
    <div className={s.name}>leftover</div>
  </div>
);

export default Total;
