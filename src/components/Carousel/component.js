import React from 'react';
import { cx, injectGlobal, css } from 'emotion';
import * as L from 'partial.lenses';
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

// For some reason, parcel breaks when 'react-emotion'
// is imported here, therefore we can't use 'styled'
const wrapperCls = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const carouselCls = css`
  width: 11.25rem;

  * {
    min-width: 0;
    min-height: 0;
  }
`;

const draggable = css`
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
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
        const carouselEl = L.get(['carousel', 'innerSlider'], this);

        // There is no interface that allows us to control state of the carousel,
        // therefore we force this in an ugly way by calling setState on ref.
        // Would be nice to fix it when time allows.
        if (carouselEl) {
          carouselEl.setState({ currentSlide: 1 }, () =>
            onFirstItemRendered(L.get(L.first, items))
          );
        } else {
          throw new Error('Cannot find carousel dom element');
        }
      }

      if (index === items.length - 1 && onLastItemRendered) {
        onLastItemRendered(L.get(L.last, items));
      }
    }
  };

  renderItems = () => {
    const { items, renderItem } = this.props;
    return items.map(item => (
      <div className={draggable} key={`carousel-item-${item}`}>
        {renderItem(item)}
      </div>
    ));
  };

  render() {
    const settings = {
      infinite: false,
      centerMode: true,
      centerPadding: 0,
      slidesToShow: 1,
      initialSlide: 1,
      focusOnSelect: true,
      speed: 150
    };

    return (
      <div className={cx(wrapperCls, this.props.className)}>
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
          {this.renderItems()}
        </Carousel>
      </div>
    );
  }
}
