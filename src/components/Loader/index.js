import * as React from 'react';
import styled from '@emotion/styled';
import { connect } from 'unistore/react';
import { ClipLoader } from 'react-spinners';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const Error = ({ error }) => <div>Errrrrror! {error}</div>;

const Spinner = ({ show }) =>
  show ? (
    <Wrapper>
      <ClipLoader color="#2f80ed" size={55} />
    </Wrapper>
  ) : null;

const Loader = connect('error')(({ error, timedOut, pastDelay }) => {
  const failed = error || timedOut;
  const show = pastDelay === undefined ? true : pastDelay;

  return failed ? <Error error={error} /> : <Spinner show={show} />;
});

export default Loader;
