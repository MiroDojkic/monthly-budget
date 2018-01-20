import * as React from 'react';
import styled, { css } from 'react-emotion';
import Button from '../Button';
import RefreshIcon from '../Icons/Refresh';
import SettingsIcon from '../Icons/Settings';

const Menu = styled.div`
  display: flex;

  justify-content: space-evenly;
  align-items: center;

  box-shadow: 0px 0px 20px rgba(66, 84, 96, 0.25);
`;

const addButtonCls = css`
  display: flex;
  margin-bottom: 20px;
  width: 60px;
  height: 60px;

  justify-content: center;
  align-items: center;

  color: white;
  background: linear-gradient(323.75deg, #2f80ed 0%, #2d9cdb 88.72%);
  box-shadow: 0px 0px 8px rgba(66, 84, 96, 0.25);

  border-radius: 30px;
  border: 1px solid white;
`;

export default class ActionsMenu extends React.Component {
  render() {
    return (
      <Menu>
        <Button>
          <RefreshIcon />
        </Button>
        <Button className={addButtonCls}>+</Button>
        <Button>
          <SettingsIcon />
        </Button>
      </Menu>
    );
  }
}
