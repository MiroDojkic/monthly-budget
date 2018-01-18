import React from 'react';
import { cx, injectGlobal, css } from 'emotion';
import get from 'lodash/get';
import first from 'lodash/first';
import last from 'lodash/last';
import debounce from 'lodash/debounce';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../Button';
import ArrowLeftIcon from '../Icons/ArrowLeft';
import ArrowRightIcon from '../Icons/ArrowRight';

/* eslint-disable */
injectGlobal`
:global(.slick-slide) {
  h5 {
    display: flex;
    justify-content: center;

    color: white;
    font-size: 1.2rem;
    font-weight: normal;
    text-transform: uppercase;
  }
}
`;
/* eslint-enable */

const carouselCls = css`
  width: 180px;

  * {
    min-width: 0;
    min-height: 0;
  }
`;

const arrowCls = css`
  height: 1.5em;
  font-size: 1em;
  fill: #fff;
`;

const ArrowLeft = ({ className, onClick, style }) => (
  <Button>
    <ArrowLeftIcon
      style={style}
      onClick={debounce(e => onClick(e), 150)}
      className={cx(arrowCls, className)}
    />
  </Button>
);

const ArrowRight = ({ className, onClick, style }) => (
  <Button>
    <ArrowRightIcon
      style={style}
      onClick={debounce(e => onClick(e), 150)}
      className={cx(arrowCls, className)}
    />
  </Button>
);

export default class CarouselComponent extends React.Component {
  onChange = index => {
    const {
      onChange,
      dynamic,
      onLastRendered,
      onFirstRendered,
      items
    } = this.props;

    if (items[index]) {
      onChange(items[index]);
    } else {
      throw new Error(
        `Cannot access index ${index} in array of items: ${items}.`
      );
    }

    if (dynamic) {
      if (index === 0 && onFirstRendered) {
        const carouselEl = get(this, 'carousel.innerSlider');

        // There is no interface that allows us to control state of the carousel,
        // therefore we force this in an ugly way by calling setState on ref.
        // Even though this isn't causing unnecessary renders
        // it would be nice to fix it when time allows.
        if (carouselEl) {
          carouselEl.setState({ currentSlide: 1 }, () =>
            onFirstRendered(first(items))
          );
        } else {
          throw new Error('Cannot find carousel dom element');
        }
      }

      if (index === items.length - 1 && onLastRendered) {
        onLastRendered(last(items));
      }
    }
  };

  render() {
    const settings = {
      infinite: false,
      centerMode: true,
      centerPadding: 0,
      slidesToShow: 1,
      initialSlide: 1,
      focusOnSelect: true
    };
    const { items, renderItem } = this.props;

    return (
      <div className={this.props.className}>
        <Carousel
          ref={carousel => {
            this.carousel = carousel;
          }}
          prevArrow={<ArrowLeft />}
          nextArrow={<ArrowRight />}
          className={carouselCls}
          afterChange={this.onChange}
          {...settings}
        >
          {items.map(renderItem)}
        </Carousel>
      </div>
    );
  }
}
