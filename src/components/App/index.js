import * as React from 'react';
import { injectGlobal } from 'react-emotion';
import { AppContainer } from 'react-hot-loader';
import Loader from '../Loader';
import Monthly from '../Monthly';
import StorageProvider from '../Storage';

/* eslint-disable */
injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

html,
body {
  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;

  font-family: 'Roboto', sans-serif;
  font-size: 16px;

  * {
    box-sizing: border-box;
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
