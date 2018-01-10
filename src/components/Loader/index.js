import * as React from 'react';
import { ScaleLoader } from 'react-spinners';

import s from './styles.scss';

const Error = () => <div>Errrrrror!</div>;

const Spinner = ({ show }) =>
  show ? (
    <div className={s.loader}>
      <ScaleLoader
        color="#616161"
        height={40}
        width={5}
        margin="2px"
        radius={2}
      />
    </div>
  ) : null;

const Loader = ({ error, timedOut, pastDelay }) => {
  const failed = error || timedOut;
  const show = pastDelay === undefined ? true : pastDelay;

  return failed ? <Error /> : <Spinner show={show} />;
};

export default Loader;
