import * as React from 'react';
import styled from 'react-emotion';
import Loader from './Loader';
import { accent, white } from '../../constants/colors';

const Wrapper = styled.div`
  grid-area: total;

  display: flex;
  flex-flow: column nowrap;

  justify-content: center;
  align-items: center;

  border-radius: 1rem;

  box-shadow: 0px 0px 38px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(0, 0, 0, 0.4);
  background: ${white};
`;

const Value = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${accent};
`;

const Name = styled.div`
  color: ${accent};
  text-transform: uppercase;
  font-weight: normal;
`;

const Total = ({ total, loading }) => (
  <Wrapper>
    {loading ? (
      <Loader />
    ) : (
      <div>
        <Value>${total}</Value>
        <Name>leftover</Name>
      </div>
    )}
  </Wrapper>
);

export default Total;
