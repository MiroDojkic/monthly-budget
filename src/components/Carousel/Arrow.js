import * as React from 'react';
import { cx, css } from 'emotion';
import debounce from 'lodash/debounce';
import Button from '../Button';
import ArrowLeftIcon from '../Icons/ArrowLeft';
import ArrowRightIcon from '../Icons/ArrowRight';
import noop from '../../util/noop';

const arrowCls = css`
  height: 1.5em;
  font-size: 1em;
  fill: #fff;
`;

const Arrow = ({ className, style, onClick, type = 'left' }) => {
  const debounced = debounce(onClick || noop, 150);

  const onClickHandler = e => {
    e.persist();
    debounced(e);
  };

  return (
    <Button>
      {type === 'left' ? (
        <ArrowLeftIcon
          style={style}
          onClick={onClickHandler}
          className={cx(arrowCls, className)}
        />
      ) : (
        <ArrowRightIcon
          style={style}
          onClick={onClickHandler}
          className={cx(arrowCls, className)}
        />
      )}
    </Button>
  );
};

export default Arrow;
