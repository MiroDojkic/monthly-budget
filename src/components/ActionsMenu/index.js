import * as React from 'react';
import styled, { css } from 'react-emotion';
import Button from '../Button';
import TransactionForm from '../TransactionForm';
import RefreshIcon from '../Icons/Refresh';
import SettingsIcon from '../Icons/Settings';
import PlusIcon from '../Icons/Plus';
import { iconDark } from '../../constants/colors';

const Menu = styled.div`
  display: flex;

  justify-content: space-evenly;
  align-items: center;

  box-shadow: 0 0 1.25rem rgba(66, 84, 96, 0.25);
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  padding: 0.25rem;

  position: relative;
  bottom: 0.875rem;

  border-radius: 50%;
  background: linear-gradient(180deg, white 0%, #e4f6ff 43.09%);

  box-shadow: 0 0 0.5rem rgba(66, 84, 96, 0.25);
`;

const Form = styled(TransactionForm)`
  position: absolute;
  bottom: 80px;
`;

const buttonCls = css`
  width: 100%;
  fill: ${iconDark};
`;

const addButtonCls = css`
  display: flex;
  min-width: 3.5rem;
  height: 3.5rem;

  justify-content: center;
  align-items: center;

  color: white;
  background: linear-gradient(323.75deg, #2f80ed 0%, #2d9cdb 88.72%);

  border-radius: 50%;
`;

export default class ActionsMenu extends React.Component {
  state = {
    isFormOpen: false
  };

  onSync = () => console.log('Sync');

  onAdd = () => {
    this.setState({ isFormOpen: true });
  };

  onSettings = () => console.log('Settings');

  render() {
    const { isFormOpen } = this.state;

    return (
      <Menu>
        <Button aria-label="Sync" onClick={this.onSync} className={buttonCls}>
          <RefreshIcon />
        </Button>
        <ButtonWrapper>
          <Button
            aria-label="Add new"
            onClick={this.onAdd}
            className={addButtonCls}
          >
            <PlusIcon
              className={css`
                fill: white;
              `}
            />
          </Button>
        </ButtonWrapper>
        <Button
          aria-label="Settings"
          onClick={this.onSettings}
          className={buttonCls}
        >
          <SettingsIcon />
        </Button>
        {isFormOpen ? <Form /> : null}
      </Menu>
    );
  }
}
