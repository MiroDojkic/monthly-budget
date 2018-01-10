import * as React from 'react';
import ReactDOM from 'react-dom';
import StorageProvider from './components/Storage';
import AppComponent from './components/App';

const App = () => (
  <StorageProvider>
    <AppComponent />
  </StorageProvider>
);

const appNode = document.getElementById('app');
ReactDOM.render(<App />, appNode);
