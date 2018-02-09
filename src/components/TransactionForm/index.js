import * as React from 'react';
import styled, { css } from 'react-emotion';
import { connect } from 'unistore/react';
import * as L from 'partial.lenses';
import actions from '../../actions/transactions';
import Select from '../Select';
import Button from '../Button';
import Checkmark from '../Icons/Checkmark';
import Close from '../Icons/Close';
import {
  white,
  primary,
  borderLight,
  iconDark,
  textLight,
  textDark,
  loaderLight
} from '../../constants/colors';

const typeOptions = [
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' }
];

const repeatOptions = [
  { label: 'Once', value: 'once' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
];

const Form = styled.form`
  display: grid;
  width: 95vw;
  max-width: 23.75rem;

  grid-template: 5.25rem 0.9375rem 4.313rem 0.9375rem 4.313rem 2.188rem / 1fr 12.5rem 1rem 6.25rem 1fr;
  grid-template-areas:
    'header header header header header'
    '. . . . .'
    '. name . value .'
    '. . . . .'
    '. select select select .'
    '. . . . .';

  background: ${white};

  border: 1px solid ${borderLight};
  border-radius: 5px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25),
    0px 0px 20px rgba(66, 84, 96, 0.25);
`;

const Header = styled.div`
  grid-area: header;
  display: flex;
  height: 5.313rem;
  justify-content: space-evenly;
  border-bottom: 1px solid ${borderLight};
`;

const Cancel = styled(Button)`
  fill: ${iconDark};
`;

const Confirm = styled(Button)`
  fill: ${primary};
`;

const Field = styled.label`
  display: flex;
  flex-flow: column;
`;

const Label = styled.div`
  grid-area: name;
  color: ${textLight};
  margin: 0.3125rem 0.9375rem;
`;

const Input = styled.input`
  grid-area: name;
  border: 1px solid ${borderLight};
  height: 2.5rem;

  padding: 0 0.9375rem;
  color: ${textDark};
  border-radius: 5px;
`;

const nameFieldCls = css`
  grid-area: name;
`;

const valueFieldCls = css`
  grid-area: value;
`;

const repeatFieldCls = css`
  grid-area: select;
  width: 100%;
`;

const checkedCls = css`
  color: inherit;
  background: ${borderLight};
`;

const activeCls = css`
  background: ${loaderLight};
`;

@connect(null, actions)
export default class TransactionForm extends React.Component {
  state = {
    type: L.get([L.first, 'value'], typeOptions),
    repeat: L.get([L.first, 'value'], repeatOptions)
  };

  onSubmit = e => {
    e.preventDefault();
    const { date, add } = this.props;
    add(date, this.state);
  };

  onChange = field => value => {
    this.setState({ [field]: value });
  };

  onInputChange = field => e => {
    this.setState({ [field]: e.currentTarget.value });
  };

  render() {
    const { className } = this.props;
    const { type, repeat } = this.state;

    return (
      <Form onSubmit={this.onSubmit} className={className}>
        <Header>
          <Cancel type="button" value="Cancel">
            <Close />
          </Cancel>
          <Select
            onChange={this.onChange('type')}
            name="transactionType"
            selected={type}
            options={typeOptions}
          />
          <Confirm type="submit" value="Save">
            <Checkmark />
          </Confirm>
        </Header>
        <Field className={nameFieldCls} htmlFor="transaction-name">
          <Label>Name</Label>
          <Input
            id="transcation-name"
            type="text"
            onChange={this.onInputChange('name')}
          />
        </Field>
        <Field className={valueFieldCls} htmlFor="transaction-value">
          <Label>Value</Label>
          <Input
            id="transcation-value"
            type="number"
            onChange={this.onInputChange('value')}
          />
        </Field>
        <Field className={repeatFieldCls}>
          <Label>Repeat</Label>
          <Select
            onChange={this.onChange('repeat')}
            labelClassName={repeatFieldCls}
            checkedClassName={checkedCls}
            activeClassName={activeCls}
            name="transactionRepeat"
            selected={repeat}
            options={repeatOptions}
          />
        </Field>
      </Form>
    );
  }
}
