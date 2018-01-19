import * as React from 'react';
import { cx, css } from 'emotion';

const resetChrome = css`
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

const Button = props => (
  <button {...props} className={cx(resetChrome, props.className)}>
    {props.children}
  </button>
);

export default Button;
