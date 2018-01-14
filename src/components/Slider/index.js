import React from 'react';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import s from './styles.scss';

export default class Slider extends React.Component {
  render() {
    const settings = {
      infinite: false,
      centerMode: true,
      centerPadding: 0,
      slidesToShow: 1,
      initialSlide: 1,
      focusOnSelect: true
    };
    const items = ['January', 'February', 'March'];

    return (
      <div className={this.props.className}>
        <Carousel className={s.carousel} {...settings}>
          {items.map(item => (
            <div key={item}>
              <h5>{item}</h5>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
