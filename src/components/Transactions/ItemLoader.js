import * as React from 'react';
import ContentLoader from 'react-content-loader';
import { loaderLight, loaderDark } from '../../constants/colors';

const ItemLoader = () => (
  <ContentLoader
    height={10}
    width={400}
    speed={2}
    primaryColor={loaderLight}
    secondaryColor={loaderDark}
  >
    <rect x="40" y="0" rx="5" ry="5" width="320" height="10" />
  </ContentLoader>
);

export default ItemLoader;
