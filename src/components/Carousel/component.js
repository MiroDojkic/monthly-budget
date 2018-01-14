import React from 'react';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import s from './styles.scss';

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
          afterChange={this.onChange}
          className={s.carousel}
          {...settings}
        >
          {items.map(renderItem)}
        </Carousel>
      </div>
    );
  }
}
