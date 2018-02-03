import * as React from 'react';
import createStore from 'unistore';
import devtools from 'unistore/devtools';
import { Provider } from 'unistore/react';
import { injectGlobal } from 'emotion';
import { AppContainer } from 'react-hot-loader';
import Monthly from '../Monthly';

import('./font.css');

const initialState = {
  loading: false,
  error: null
};

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(initialState)
    : devtools(createStore(initialState));

/* eslint-disable no-unused-expressions */
injectGlobal`
* {
  box-sizing: border-box;
  font-size: 16px;
  font-family: "Roboto", sans-serif;

  input,
  textarea,
  button,
  select,
  label,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
}
`;
/* eslint-enable no-unusued-expressions */

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <Provider store={store}>
          <Monthly />
        </Provider>
      </AppContainer>
    );
  }
}

export default App;
