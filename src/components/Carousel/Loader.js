import * as React from 'react';
import styled from 'react-emotion';
import ContentLoader from 'react-content-loader';

const Wrapper = styled.div`
  grid-area: carousel;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 100%;
    width: 100%;
  }
`;

const Loader = () => (
  <Wrapper>
    <ContentLoader
      height={100}
      width={500}
      speed={2}
      primaryColor="#e2e2e2"
      secondaryColor="#d4d4d4"
    >
      <rect x="0" y="25" rx="20" ry="20" width="500" height="40" />
    </ContentLoader>
  </Wrapper>
);

export default Loader;
