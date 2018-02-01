import * as React from 'react';
import styled, { css } from 'react-emotion';
import first from 'lodash/first';
import get from 'lodash/get';
import Select from '../Select';
import Button from '../Button';
import Checkmark from '../Icons/Checkmark';
import Close from '../Icons/Close';
import {
  primary,
  borderLight,
  iconDark,
  textLight,
  textDark
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
  height: 40vh;
  width: 95vw;

  border: 1px solid ${borderLight};
  border-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  height: 83px;
  justify-content: space-evenly;
  border-bottom: 1px solid ${borderLight};
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 205px;
  padding-bottom: 40px;

  justify-content: space-evenly;
  align-content: space-around;
  align-items: center;
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
  color: ${textLight};
  margin: 5px 20px;
`;

const Input = styled.input`
  border: 1px solid ${borderLight};
  height: 40px;
  color: ${textDark};
  border-radius: 5px;
`;

const nameFieldCls = css`
  width: 200px;
`;

const valueFieldCls = css`
  width: 100px;
`;

const repeatFieldCls = css`
  padding: 10px 12px 8px;
`;

const checkedCls = css`
  background: ${borderLight};
`;

export default class TransactionForm extends React.Component {
  state = {
    type: get(first(typeOptions), 'value'),
    repeat: get(first(repeatOptions), 'value')
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  onChange = field => value => {
    this.setState({ [field]: value });
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
        <Body>
          <Field className={nameFieldCls} htmlFor="transaction-name">
            <Label>Name</Label> <Input id="transcation-name" type="text" />
          </Field>
          <Field className={valueFieldCls} htmlFor="transaction-value">
            <Label>Value</Label> <Input id="transcation-value" type="number" />
          </Field>
          <Field>
            <Label>Repeat</Label>
            <Select
              onChange={this.onChange('repeat')}
              labelClassName={repeatFieldCls}
              checkedClassName={checkedCls}
              name="transactionRepeat"
              selected={repeat}
              options={repeatOptions}
            />
          </Field>
        </Body>
      </Form>
    );
  }
}
