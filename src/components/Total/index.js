import * as React from 'react';
import styled from '@emotion/styled';
import { connect } from 'unistore/react';
import Loader from './Loader';
import { getLoading } from '../../selectors/transactions';
import { accent, white } from '../../constants/colors';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  justify-content: center;
  align-items: center;

  border-radius: 1rem;

  box-shadow: 0 0 2.375rem rgba(0, 0, 0, 0.4), 0 0 0.5rem rgba(0, 0, 0, 0.4);
  background: ${white};
`;

const CenteredColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
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

const Total = connect((state) => ({
  loading: getLoading(state),
}))(({ total, loading, className }) => (
  <Wrapper className={className}>
    {loading ? (
      <Loader />
    ) : (
      <CenteredColumn>
        <Value>${total || 0}</Value>
        <Name>leftover</Name>
      </CenteredColumn>
    )}
  </Wrapper>
));

export default Total;
