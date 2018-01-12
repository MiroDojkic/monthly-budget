import React from 'react';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import s from './styles.scss';

const Item = item => (
  <div className={s.item} key={item}>
    <h5>{item}</h5>
  </div>
);

export default class Slider extends React.Component {
  render() {
    const settings = {
      infinite: false,
      centerMode: true,
      centerPadding: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1
    };
    const items = ['January', 'February', 'March'];

    return (
      <Carousel className={s.carousel} {...settings}>
        {items.map(Item)}
      </Carousel>
    );
  }
}
