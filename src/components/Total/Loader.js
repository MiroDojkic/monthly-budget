import * as React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = () => (
  <ContentLoader
    height={100}
    width={200}
    speed={2}
    primaryColor="#e2e2e2"
    secondaryColor="#d4d4d4"
  >
    <rect x="55" y="35" rx="5" ry="5" width="84" height="10" />
    <rect x="55" y="60" rx="5" ry="5" width="84" height="8" />
  </ContentLoader>
);

export default Loader;
