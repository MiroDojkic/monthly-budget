import React from 'react';
import styled from '@emotion/styled';
import * as L from 'partial.lenses';
import Carousel from 'nuka-carousel';
import ArrowButton from './ArrowButton';

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

const CarouselComponent = ({
  activeItemIndex,
  items,
  renderItem,
  className,
  onActiveItemChange,
  onLastItemActive,
  onFirstItemActive,
}) => {
  const onChange = index => {
    if (index === 0 && onFirstItemActive) {
      onFirstItemActive(L.get(L.first, items));
    } else if (index === items.length - 1 && onLastItemActive) {
      onLastItemActive(L.get(L.last, items));
    } else {
      onActiveItemChange(index);
    }
  };
  const previous = () => {
    onChange(activeItemIndex - 1);
  };
  const next = () => {
    onChange(activeItemIndex + 1);
  };
  return (
    <Container className={className}>
      <Carousel
        renderCenterLeftControls={() => (
          <ArrowButton onClick={previous} type="left" />
        )}
        renderCenterRightControls={() => (
          <ArrowButton onClick={next} type="right" />
        )}
        renderBottomCenterControls={() => null}
        slideIndex={activeItemIndex}
        afterSlide={onChange}
        disableAnimation
        dragging={false}
      >
        {items.map(item => (
          <Draggable key={`carousel-item-${item}`}>
            {renderItem(item)}
          </Draggable>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarouselComponent;
