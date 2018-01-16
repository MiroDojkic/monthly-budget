import * as React from 'react';
import styled, { css } from 'react-emotion';
import fecha from 'fecha';
import Carousel from '../Carousel';
import Total from '../Total';
import formats from '../../util/datetimes';

const Header = styled.header`
  grid-row: 1 / 2;
  grid-column: 1 / 2;

  display: grid;
  grid-template: 44px 30px 22px 100px 25px / 53px 45px 1fr 45px 53px;

  background: linear-gradient(45deg, #2f80ed, #2d9cdb);
`;

const carouselCls = css`
  grid-row: 2 / span 1;
  grid-column: 1 / -1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Listing = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  color: #425460;
`;

const ListingItem = styled.div`
  display: flex;
  width: 100%;
  padding: 21px 33px 17px;

  justify-content: space-between;
  align-items: flex-end;

  border-bottom: 1px solid #e5e5e5;
  font-size: 1.5rem;
`;

const IncomeName = styled.div`
  font-weight: bold;
  text-transform: capitalize;
`;

const Name = styled.span`
  text-transform: capitalize;
  font-size: 1.125rem;
`;

const Value = styled.span`
  font-weight: bold;
`;

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

const Transactions = ({ incomeTotal, expenses }) => (
  <Listing>
    <ListingItem>
      <IncomeName>income</IncomeName>
      <Value>${incomeTotal}</Value>
    </ListingItem>
    {expenses.map(({ name, value }) => (
      <ListingItem key={name}>
        <Name>{name}</Name>
        <Value>- ${value}</Value>
      </ListingItem>
    ))}
  </Listing>
);

const Wrapper = styled.div`
  display: grid;
  grid-template: 220px 1fr 50px / 100%;
`;

const Monthly = ({ month, expenses, incomeTotal, total }) => (
  <Wrapper>
    <Header>
      <Carousel
        items={getInitialDates()}
        renderItem={renderMonth}
        onChange={whatever => {
          console.log(whatever.getMonth());
        }}
        className={carouselCls}
      />
      <Total total={total} />
    </Header>
    <Transactions incomeTotal={incomeTotal} expenses={expenses} />
  </Wrapper>
);

export default Monthly;
