import * as React from 'react';
import styled, { css } from 'react-emotion';
import Button from '../Button';
import RefreshIcon from '../Icons/Refresh';
import SettingsIcon from '../Icons/Settings';
import PlusIcon from '../Icons/Plus';
import { iconDark } from '../../constants/colors';

const Menu = styled.div`
  display: flex;

  justify-content: space-evenly;
  align-items: center;

  box-shadow: 0px 0px 20px rgba(66, 84, 96, 0.25);
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  padding: 4px;

  position: relative;
  bottom: 14px;

  border-radius: 50%;
  background: linear-gradient(180deg, white 0%, #e4f6ff 43.09%);

  box-shadow: 0px 0px 8px rgba(66, 84, 96, 0.25);
`;

const buttonCls = css`
  width: 100%;
  fill: ${iconDark};
`;

const addButtonCls = css`
  display: flex;
  min-width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  color: white;
  background: linear-gradient(323.75deg, #2f80ed 0%, #2d9cdb 88.72%);

  border-radius: 30px;
`;

export default class ActionsMenu extends React.Component {
  onSync = () => console.log('Sync');
  onAdd = () => console.log('Add');
  onSettings = () => console.log('Settings');

  render() {
    return (
      <Menu>
        <Button onClick={this.onSync} className={buttonCls}>
          <RefreshIcon />
        </Button>
        <ButtonWrapper>
          <Button onClick={this.onAdd} className={addButtonCls}>
            <PlusIcon
              className={css`
                fill: white;
              `}
            />
          </Button>
        </ButtonWrapper>
        <Button onClick={this.onSettings} className={buttonCls}>
          <SettingsIcon />
        </Button>
      </Menu>
    );
  }
}
