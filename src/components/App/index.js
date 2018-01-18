import * as React from 'react';
import { injectGlobal } from 'emotion';
import { AppContainer } from 'react-hot-loader';
import Loader from '../Loader';
import Monthly from '../Monthly';
import StorageProvider from '../Storage';

/* eslint-disable */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  @font-face {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.googleapis.com/css?family=Roboto:400,500,700) format('woff2');
    unicode-range: U+0100-024f, U+1-1eff,
      U+20a0-20ab, U+20ad-20cf, U+2c60-2c7f,
      U+A720-A7FF;
  }
}
`;
// /* eslint-enable */

class HomePage extends React.Component {
  render() {
    return this.props.loading ? <Loader /> : <Monthly {...{ ...this.props }} />;
  }
}

const App = () => (
  <AppContainer>
    <StorageProvider>
      <HomePage />
    </StorageProvider>
  </AppContainer>
);

export default App;
