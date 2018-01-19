import * as React from 'react';
import { injectGlobal } from 'emotion';
import { AppContainer } from 'react-hot-loader';
import Loader from '../Loader';
import Monthly from '../Monthly';
import StorageProvider from '../Storage';

import('./font.css');

/* eslint-disable no-unused-expressions */
injectGlobal`
* {
  box-sizing: border-box;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
}
`;
/* eslint-enable no-unusued-expressions */

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
