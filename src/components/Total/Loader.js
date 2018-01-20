import * as React from 'react';
import ContentLoader from 'react-content-loader';
import { loaderLight, loaderDark } from '../../constants/colors';

const Loader = () => (
  <ContentLoader
    height={100}
    width={200}
    speed={2}
    primaryColor={loaderLight}
    secondaryColor={loaderDark}
  >
    <rect x="55" y="35" rx="5" ry="5" width="84" height="10" />
    <rect x="55" y="60" rx="5" ry="5" width="84" height="8" />
  </ContentLoader>
);

export default Loader;
