import * as React from 'react';
import styled from 'react-emotion';

const Wrapper = styled.div`
  grid-area: total;

  display: flex;
  flex-flow: column nowrap;

  justify-content: center;
  align-items: center;

  border-radius: 1rem;

  box-shadow: 0px 0px 38px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(0, 0, 0, 0.4);
  background: white;
`;

const Value = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: #ec5d73;
`;

const Name = styled.div`
  color: #ec5d73;
  text-transform: uppercase;
  font-weight: normal;
`;

const Total = ({ total }) => (
  <Wrapper>
    <Value>${total}</Value>
    <Name>leftover</Name>
  </Wrapper>
);

export default Total;
