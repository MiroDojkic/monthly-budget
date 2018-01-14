import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import Loader from '../Loader';
import Monthly from '../Monthly';
import StorageProvider from '../Storage';

import './styles.scss';

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
