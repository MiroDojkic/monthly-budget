import * as React from 'react';
import styled from 'react-emotion';
import ItemLoader from './ItemLoader';
import { emptyIterable } from '../../util/iterables';
import { textDark } from '../../constants/colors';

const Listing = styled.div`
  color: ${textDark};
  overflow: scroll;
`;

const ListingItem = styled.div`
  display: flex;
  width: 100%;
  padding: 21px 33px 17px;

  justify-content: space-between;
  align-items: flex-end;

  border-bottom: 1px solid #e5e5e5;
  font-size: 1.5rem;

  svg {
    width: 100%;
    height: 1vh;
  }
`;

const Loader = () => (
  <Listing>
    {emptyIterable(4).map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <ListingItem key={`item-loader-${idx}`} loading>
        <ItemLoader />
      </ListingItem>
    ))}
  </Listing>
);

const IncomeName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: capitalize;
`;

const Name = styled.span`
  text-transform: capitalize;
  font-size: 1.125rem;
`;

const Value = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Expenses = ({ expenses }) =>
  expenses.map(({ name, value }) => (
    <ListingItem key={name}>
      <Name>{name}</Name>
      <Value>- ${value}</Value>
    </ListingItem>
  ));

const Transactions = ({ loading, incomeTotal, expenses, className }) =>
  loading ? (
    <Loader />
  ) : (
    <Listing className={className}>
      <ListingItem>
        <IncomeName>income</IncomeName>
        <Value>${incomeTotal}</Value>
      </ListingItem>
      <Expenses expenses={expenses} />
    </Listing>
  );

export default Transactions;
