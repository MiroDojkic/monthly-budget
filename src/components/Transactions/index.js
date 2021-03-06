import * as React from 'react';
import styled from '@emotion/styled';
import { connect } from 'unistore/react';
import ItemLoader from './ItemLoader';
import { getLoading } from '../../selectors/transactions';
import { emptyIterable } from '../../util/iterables';
import { textDark } from '../../constants/colors';

const Listing = styled.div`
  color: ${textDark};
  overflow: scroll;
`;

const ListingItem = styled.div`
  display: flex;
  width: 100%;
  padding: 1.063rem 2.063rem;

  justify-content: space-between;
  align-items: flex-end;

  border-bottom: 0.0625rem solid #e5e5e5;
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
      <ListingItem key={`item-loader-${idx}`}>
        <ItemLoader />
      </ListingItem>
    ))}
  </Listing>
);

const IncomeName = styled.div`
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: bold;
`;

const IncomeValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Name = styled.span`
  text-transform: capitalize;
  font-size: 1.125rem;
`;

const Value = styled.span`
  font-weight: bold;
  font-size: 1.125rem;
`;

const Income = ({ value }) => (
  <>
    <IncomeName>Income</IncomeName>
    <IncomeValue>${value || 0}</IncomeValue>
  </>
);

const Expenses = ({ expenses }) =>
  expenses
    ? expenses.map(({ name, created_at: tz, value }) => (
        <ListingItem key={`${name}-${tz}`}>
          <Name>{name}</Name>
          <Value>- ${value}</Value>
        </ListingItem>
      ))
    : null;

const Transactions = connect(state => ({
  loading: getLoading(state),
}))(({ loading, incomeTotal, expenses, className }) =>
  loading ? (
    <Loader />
  ) : (
    <Listing className={className}>
      <ListingItem>
        <Income value={incomeTotal} />
      </ListingItem>
      <Expenses expenses={expenses} />
    </Listing>
  ),
);

export default styled(Transactions)``;
