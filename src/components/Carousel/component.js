import React from 'react';
import { injectGlobal, css } from 'emotion';
import get from 'lodash/get';
import first from 'lodash/first';
import last from 'lodash/last';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowButton from './ArrowButton';
import { white } from '../../constants/colors';

/* eslint-disable */
injectGlobal`
.slick-slide {
  h5 {
    display: flex;
    justify-content: center;

    color: ${white};
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

export default class CarouselComponent extends React.Component {
  onChange = index => {
    const {
      onChange,
      dynamic,
      onLastItemRendered,
      onFirstItemRendered,
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
      if (index === 0 && onFirstItemRendered) {
        const carouselEl = get(this, 'carousel.innerSlider');

        // There is no interface that allows us to control state of the carousel,
        // therefore we force this in an ugly way by calling setState on ref.
        // Would be nice to fix it when time allows.
        if (carouselEl) {
          carouselEl.setState({ currentSlide: 1 }, () =>
            onFirstItemRendered(first(items))
          );
        } else {
          throw new Error('Cannot find carousel dom element');
        }
      }

      if (index === items.length - 1 && onLastItemRendered) {
        onLastItemRendered(last(items));
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
    const { items, renderItem, className } = this.props;

    return (
      <div className={className}>
        <Carousel
          ref={carousel => {
            this.carousel = carousel;
          }}
          prevArrow={<ArrowButton type="left" />}
          nextArrow={<ArrowButton type="right" />}
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
