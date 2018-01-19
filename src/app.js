import * as React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/App';

require('react-hot-loader/patch');

const render = () => {
  ReactDOM.render(<AppComponent />, document.getElementById('app'));
};
render();

if (module.hot) {
  module.hot.accept(() => {
    render();
  });
}
