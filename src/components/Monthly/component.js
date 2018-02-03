import * as React from 'react';
import styled, { css } from 'react-emotion';
import fecha from 'fecha';
import Carousel from '../Carousel';
import Total from '../Total';
import Transactions from '../Transactions';
import ActionsMenu from '../ActionsMenu';
import formats, {
  getInitialDates,
  getPreviousMonth,
  getNextMonth
} from '../../util/datetimes';
import getTransactionByDate from '../../util/selectors';
import { primaryGradient } from '../../constants/colors';

const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template: 12.5rem 1fr 3.125rem / 100%;
  grid-template-areas:
    'header'
    'listing'
    'buttons';
`;

const Header = styled.header`
  grid-area: header;
  padding: 1.563rem 3.313rem;

  display: grid;
  grid-template: 1.875rem auto 6.25rem / auto 16.88rem auto;
  grid-template-areas:
    '. carousel .'
    '. . .'
    '. total .';

  background: ${primaryGradient};
`;

export default class Monthly extends React.Component {
  componentWillMount() {
    this.props.loadByDate(new Date());
  }

  state = {
    dates: getInitialDates(),
    selectedDate: new Date()
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
    <h5>{fecha.format(date, formats.MONTH_LONG)}</h5>
  );

  onChange = date => {
    this.setState({ selectedDate: date });
    this.props.loadByDate(date);
  };

  render() {
    const { loading, transactions } = this.props;
    const { selectedDate } = this.state;

    const { total, expenses, incomeTotal } = getTransactionByDate(
      transactions,
      selectedDate
    );

    return (
      <Grid>
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
        <ActionsMenu
          className={css`
            grid-area: buttons;
          `}
        />
      </Grid>
    );
  }
}
