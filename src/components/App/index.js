import * as React from 'react';
import { injectGlobal } from 'emotion';
import { AppContainer } from 'react-hot-loader';
import Loader from '../Loader';
import Monthly from '../Monthly';
import StorageProvider from '../Storage';

/* eslint-disable no-unused-expressions */
injectGlobal`
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
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
