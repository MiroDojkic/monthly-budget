import * as React from 'react';
import { cx, css } from 'emotion';

const buttonCls = css`
  padding: 0;
  margin: 0;

  border: none;
  background: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  font-family: inherit;
  font-weight: normal;
  font-size: inherit;

  &:focus,
  &:active {
    outline: none;
  }
`;

export default props => (
  <button {...props} className={cx(buttonCls, props.className)}>
    {props.children}
  </button>
);
