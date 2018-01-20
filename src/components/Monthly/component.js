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
import { primaryGradient } from '../../constants/colors';

const Header = styled.header`
  grid-area: header;
  padding: 44px 53px 25px 53px;

  display: grid;
  grid-template: 30px 22px 100px / auto 270px auto;
  grid-template-areas:
    '. carousel .'
    '. . . '
    '. total .';

  background: ${primaryGradient};
`;

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

  renderMonth = (date, idx) => (
    <div key={`${date}-${idx}`}>
      <h5>{fecha.format(date, formats.MONTH_LONG)}</h5>
    </div>
  );

  onChange = date => console.log(date.getMonth());

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
            renderItem={this.renderMonth}
            onChange={this.onChange}
            className={css`
              grid-area: carousel;
            `}
          />
          <Total
            total={total}
            loading={loading}
            className={css`
              grid-area: total;
            `}
          />
        </Header>
        <Transactions
          loading={loading}
          incomeTotal={incomeTotal}
          expenses={expenses}
          className={css`
            grid-area: listing;
          `}
        />
      </Wrapper>
    );
  }
}
