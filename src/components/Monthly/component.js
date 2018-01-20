import * as React from 'react';
import styled, { css } from 'react-emotion';
import fecha from 'fecha';
import Carousel from '../Carousel';
import Total from '../Total';
import Transactions from '../Transactions';
import formats, {
  getInitialDates,
  getPreviousMonth,
  getNextMonth
} from '../../util/datetimes';

const Header = styled.header`
  grid-area: header;
  padding: 44px 53px 25px 53px;

  display: grid;
  grid-template: 30px 22px 100px / auto 270px auto;
  grid-template-areas:
    '. carousel .'
    '. . . '
    '. total .';

  background: linear-gradient(45deg, #2f80ed, #2d9cdb);
`;

const carouselCls = css`
  grid-area: carousel

  display: flex;
  justify-content: center;
  align-items: center;
`;

const renderMonth = (date, idx) => (
  <div key={`${date}-${idx}`}>
    <h5>{fecha.format(date, formats.MONTH_LONG)}</h5>
  </div>
);

const Wrapper = styled.div`
  display: grid;
  grid-template: 220px 1fr 50px / 100%;
  grid-template-areas:
    'header'
    'listing'
    'buttons';
`;

export default class Monthly extends React.Component {
  componentWillMount() {
    this.props.syncStorage();
  }

  state = {
    dates: getInitialDates()
  };

  onFirstMonthRendered = firstMonth => {
    const previous = getPreviousMonth(firstMonth);
    this.setState(state => ({
      dates: [previous, ...state.dates]
    }));
  };

  onLastMonthRendered = lastMonth => {
    const next = getNextMonth(lastMonth);
    this.setState(state => ({
      dates: [...state.dates, next]
    }));
  };

  render() {
    const { loading, expenses, incomeTotal, total } = this.props;
    return (
      <Wrapper>
        <Header>
          <Carousel
            dynamic
            onFirstItemRendered={this.onFirstMonthRendered}
            onLastItemRendered={this.onLastMonthRendered}
            items={this.state.dates}
            renderItem={renderMonth}
            onChange={whatever => {
              console.log(whatever.getMonth());
            }}
            className={carouselCls}
          />
          <Total total={total} loading={loading} />
        </Header>
        <Transactions
          loading={loading}
          incomeTotal={incomeTotal}
          expenses={expenses}
        />
      </Wrapper>
    );
  }
}
