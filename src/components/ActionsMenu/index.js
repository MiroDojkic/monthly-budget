import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
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

const PrimaryAction = styled.div`
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
  bottom: 5rem;
`;

const buttonCls = css`
  width: 100%;
  fill: ${iconDark};
`;

const AddButton = styled(Button)`
  display: flex;
  min-width: 3.5rem;
  height: 3.5rem;
  justify-content: center;
  align-items: center;
  color: white;
  background: linear-gradient(323.75deg, #2f80ed 0%, #2d9cdb 88.72%);
  border-radius: 50%;
`;

const ActionsMenu = ({ selectedDate }) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  return (
    <Menu>
      <Button aria-label="Sync" css={buttonCls}>
        <RefreshIcon />
      </Button>
      <PrimaryAction>
        <AddButton aria-label="Add new" onClick={setIsFormOpen}>
          <PlusIcon />
        </AddButton>
      </PrimaryAction>
      <Button aria-label="Settings" css={buttonCls}>
        <SettingsIcon />
      </Button>
      {isFormOpen ? <Form date={selectedDate} /> : null}
    </Menu>
  );
};

export default styled(ActionsMenu)``;
