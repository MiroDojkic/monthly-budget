import * as React from 'react';
import styled from 'react-emotion';

const Wrapper = styled.div`
  grid-row: 4 / 5;
  grid-column: 2 / 5;

  display: flex;
  flex-flow: column nowrap;

  justify-content: center;
  align-items: center;

  border-radius: 1rem;

  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
  background: white;
`;

const Value = styled.div`
  font-size: 2.2rem;
  font-weight: medium;
  color: #ec5d73;
`;

const Name = styled.div`
  color: #ec5d73;
  text-transform: uppercase;
  font-weight: medium;
`;

const Total = ({ total }) => (
  <Wrapper>
    <Value>${total}</Value>
    <Name>leftover</Name>
  </Wrapper>
);

export default Total;
