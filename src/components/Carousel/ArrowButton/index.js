import * as React from 'react';
import { cx, css } from 'emotion';
import debounce from 'lodash/debounce';
import Button from '../../Button';
import ArrowLeftIcon from '../../Icons/ArrowLeft';
import ArrowRightIcon from '../../Icons/ArrowRight';
import noop from '../../../util/noop';

const cls = css`
  height: 1.5em;
  font-size: 1em;
  fill: #fff;
`;

export default class ArrowButton extends React.Component {
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
            className={cx(cls, className)}
          />
        ) : (
          <ArrowRightIcon
            aria-label="Next"
            style={style}
            onClick={this.onClick}
            className={cx(cls, className)}
          />
        )}
      </Button>
    );
  }
}
