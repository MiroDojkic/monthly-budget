import * as React from 'react';
import styled from 'react-emotion';
import { ClipLoader } from 'react-spinners';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const Error = () => <div>Errrrrror!</div>;

const Spinner = ({ show }) =>
  show ? (
    <Wrapper>
      <ClipLoader color="#2f80ed" size={55} />
    </Wrapper>
  ) : null;

const Loader = ({ error, timedOut, pastDelay }) => {
  const failed = error || timedOut;
  const show = pastDelay === undefined ? true : pastDelay;

  return failed ? <Error /> : <Spinner show={show} />;
};

export default Loader;
