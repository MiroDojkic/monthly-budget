import * as React from 'react';
import ContentLoader from 'react-content-loader';

const ItemLoader = () => (
  <ContentLoader
    height={10}
    width={400}
    speed={2}
    primaryColor="#e2e2e2"
    secondaryColor="#d4d4d4"
  >
    <rect x="40" y="0" rx="5" ry="5" width="320" height="10" />
  </ContentLoader>
);

export default ItemLoader;
