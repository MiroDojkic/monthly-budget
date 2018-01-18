import * as React from 'react';
import styled, { css } from 'react-emotion';
import fecha from 'fecha';
import Carousel from '../Carousel';
import Total from '../Total';
import formats, {
  getInitialDates,
  getPreviousMonth,
  getNextMonth
} from '../../util/datetimes';

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

const renderMonth = (date, idx) => (
  <div key={`${date}-${idx}`}>
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

export default class Monthly extends React.Component {
  state = {
    dates: getInitialDates()
  };

  onFirstRendered = firstMonth => {
    const previous = getPreviousMonth(firstMonth);
    this.setState(state => ({
      dates: [previous, ...state.dates]
    }));
  };

  onLastRendered = lastMonth => {
    const next = getNextMonth(lastMonth);
    this.setState(state => ({
      dates: [...state.dates, next]
    }));
  };

  render() {
    const { expenses, incomeTotal, total } = this.props;
    return (
      <Wrapper>
        <Header>
          <Carousel
            dynamic
            onFirstRendered={this.onFirstRendered}
            onLastRendered={this.onLastRendered}
            items={this.state.dates}
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
  }
}
