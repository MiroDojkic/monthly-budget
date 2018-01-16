import React from 'react';
import { injectGlobal, css } from 'emotion';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
// /* eslint-enable */

const carouselCls = css`
  width: 180px;

  * {
    min-width: 0;
    min-height: 0;
  }
`;

export default class CarouselComponent extends React.Component {
  onChange = index => {
    const { onChange, items } = this.props;

    if (items[index]) {
      onChange(items[index]);
    } else {
      throw new Error(
        `Cannot access index ${index} in array of items: ${items}.`
      );
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
