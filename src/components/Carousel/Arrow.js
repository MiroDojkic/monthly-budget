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

export default class Arrow extends React.Component {
  onClick = noop;

  componentWillReceiveProps({ onClick }) {
    if (onClick && onClick !== this.props.onClick) {
      const debouncedHandler = debounce(onClick, 150);

      this.onClick = e => {
        e.persist();
        debouncedHandler(e);
      };
    }
  }

  render() {
    const { className, style, type = 'left' } = this.props;

    return (
      <Button>
        {type === 'left' ? (
          <ArrowLeftIcon
            aria-label="Previous"
            style={style}
            onClick={this.onClick}
            className={cx(arrowCls, className)}
          />
        ) : (
          <ArrowRightIcon
            aria-label="Next"
            style={style}
            onClick={this.onClick}
            className={cx(arrowCls, className)}
          />
        )}
      </Button>
    );
  }
}
