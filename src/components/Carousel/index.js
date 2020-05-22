import React from 'react';
import styled from '@emotion/styled';
import * as L from 'partial.lenses';
import NukaCarousel from 'nuka-carousel';
import ArrowButton from './ArrowButton';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .slider-slide {
    outline: none;
  }
`;

const Carousel = ({
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
      <NukaCarousel
        renderCenterLeftControls={() => <ArrowButton onClick={previous} />}
        renderCenterRightControls={() => <ArrowButton onClick={next} right />}
        renderBottomCenterControls={() => null}
        slideIndex={activeItemIndex}
        afterSlide={onChange}
        disableAnimation
        dragging={false}
      >
        {items.map(item => renderItem(item))}
      </NukaCarousel>
    </Container>
  );
};

export default styled(Carousel)``;
