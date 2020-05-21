import * as React from 'react';
import { css } from '@emotion/core';
import Button from '../../Button';
import ArrowLeftIcon from '../../Icons/ArrowLeft';
import ArrowRightIcon from '../../Icons/ArrowRight';
import { white } from '../../../constants/colors';

const arrowCls = css`
  height: 1.5em;
  font-size: 1em;
  fill: ${white};
`;

export default class ArrowButton extends React.Component {
  render() {
    const { onClick, disabled, type = 'left' } = this.props;

    return (
      <Button onClick={onClick} disabled={disabled}>
        {type === 'left' ? (
          <ArrowLeftIcon aria-label="Previous" css={arrowCls} />
        ) : (
          <ArrowRightIcon aria-label="Next" css={arrowCls} />
        )}
      </Button>
    );
  }
}
