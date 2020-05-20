import * as React from 'react';
import styled from '@emotion/styled';

const Styled = styled.button`
  padding: 0;
  margin: 0;

  border: none;
  background: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  font-family: inherit;
  font-weight: normal;
  font-size: inherit;

  cursor: pointer;
`;

const Button = ({ children, ...rest }) => <Styled {...rest}>{children}</Styled>;

export default Button;
