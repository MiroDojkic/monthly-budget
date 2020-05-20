import React from 'react';
import styled from '@emotion/styled';
import * as L from 'partial.lenses';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Draggable = styled.div`
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
  state = { current: 1 };

  onChange = index => {
    const {
      onChange,
      onLastItemRendered,
      onFirstItemRendered,
      items,
    } = this.props;
    console.log('CHAING');

    if (items[index]) {
      onChange(items[index]);
    }

    if (index === 0 && onFirstItemRendered) {
      this.setState({ current: 1 }, () =>
        onFirstItemRendered(L.get(L.first, items)),
      );
    }

    if (index === items.length - 1 && onLastItemRendered) {
      onLastItemRendered(L.get(L.last, items));
    }
  };

  renderItems = () => {
    const { items, renderItem } = this.props;
    return items.map(item => (
      <Draggable key={`carousel-item-${item}`}>{renderItem(item)}</Draggable>
    ));
  };

  update = index => {
    this.setState({ current: index });
  };

  render() {
    const { current } = this.state;
    const { className } = this.props;
    return (
      <Container className={className}>
        <Carousel
          centerMode
          selectedItem={current}
          onChange={this.onChange}
          onClickThumb={this.onChange}
        />
        {this.renderItems()}
      </Container>
    );
  }
}
