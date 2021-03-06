import * as React from 'react';
import { connect } from 'unistore/react';
import styled from '@emotion/styled';
import { format } from 'fecha';
import Carousel from '../Carousel';
import Total from '../Total';
import Transactions from '../Transactions';
import ActionsMenu from '../ActionsMenu';
import formats, {
  getInitialDates,
  getPreviousMonth,
  getNextMonth,
} from '../../util/datetimes';
import { primaryGradient, white } from '../../constants/colors';
import actions from '../../actions/transactions';
import {
  getTotalByDate,
  getExpensesByDate,
  getIncomeTotalByDate,
} from '../../selectors/transactions';

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

  ${Carousel} {
    grid-area: carousel;
  }

  ${Total} {
    grid-area: total;
  }
`;

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template: 12.5rem 1fr 3.125rem / 100%;
  grid-template-areas:
    'header'
    'listing'
    'buttons';

  ${Header} {
    grid-area: header;
  }

  ${Transactions} {
    grid-area: listing;
  }

  ${ActionsMenu} {
    grid-area: buttons;
  }
`;

const Month = styled.h5`
  margin: 0;
  text-align: center;
  color: ${white};

  :focus {
    outline: none;
  }
`;

@connect(
  state => ({
    getExpensesByDate: getExpensesByDate(state),
    getIncomeTotalByDate: getIncomeTotalByDate(state),
    getTotalByDate: getTotalByDate(state),
  }),
  actions,
)
export default class Monthly extends React.Component {
  componentWillMount() {
    this.props.loadByDate(new Date());
  }
  state = {
    dates: getInitialDates(),
    activeDateIndex: 1,
  };
  onFirstMonthRendered = firstMonth => {
    const previous = getPreviousMonth(firstMonth);
    this.setState(
      state => ({
        dates: [previous, ...state.dates],
      }),
      () => {
        this.setState({ activeDateIndex: 1 });
      },
    );
  };
  onLastMonthRendered = lastMonth => {
    const next = getNextMonth(lastMonth);
    this.setState(
      state => ({
        dates: [...state.dates, next],
      }),
      () =>
        this.setState(state => ({
          activeDateIndex: state.dates.length - 2,
        })),
    );
  };
  renderMonth = date => (
    <Month key={date}>{format(date, formats.TRUNC_TO_MONTH_PRETTY)}</Month>
  );
  loadDate = index => {
    this.setState({ activeDateIndex: index });
    const date = this.state.dates[index];
    this.props.loadByDate(date);
  };
  render() {
    const {
      getIncomeTotalByDate,
      getExpensesByDate,
      getTotalByDate,
    } = this.props;
    const { activeDateIndex } = this.state;
    const selectedDate = this.state.dates[activeDateIndex];
    const expenses = getExpensesByDate(selectedDate);
    const incomeTotal = getIncomeTotalByDate(selectedDate);
    const total = getTotalByDate(selectedDate);
    return (
      <Layout>
        <Header>
          <Carousel
            onFirstItemActive={this.onFirstMonthRendered}
            onLastItemActive={this.onLastMonthRendered}
            items={this.state.dates}
            activeItemIndex={activeDateIndex}
            renderItem={this.renderMonth}
            onActiveItemChange={this.loadDate}
          />
          <Total total={total} />
        </Header>
        <Transactions incomeTotal={incomeTotal} expenses={expenses} />
        <ActionsMenu selectedDate={selectedDate} />
      </Layout>
    );
  }
}
