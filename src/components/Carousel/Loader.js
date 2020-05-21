import * as React from 'react';
import styled from '@emotion/styled';
import ContentLoader from 'react-content-loader';
import { loaderLight, loaderDark } from '../../constants/colors';

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
      primaryColor={loaderLight}
      secondaryColor={loaderDark}
    >
      <rect x="0" y="25" rx="20" ry="20" width="500" height="40" />
    </ContentLoader>
  </Wrapper>
);

export default Loader;
