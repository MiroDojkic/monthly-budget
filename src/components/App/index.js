import * as React from 'react';
import createStore from 'unistore';
import devtools from 'unistore/devtools';
import { Provider } from 'unistore/react';
import persistStore from 'unissist';
import indexedDBAdapter from 'unissist/integrations/indexdbAdapter';

import { Global } from '@emotion/core';
import { AppContainer } from 'react-hot-loader';
import Monthly from '../Monthly';

import('./font.css');

const initialState = {
  transactions: {
    transactions: [],
    loading: false,
    error: null,
    cacheMap: {},
  },
};

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(initialState)
    : devtools(createStore(initialState));

const adapter = indexedDBAdapter();
persistStore(store, adapter);

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <>
          <Global
            styles={{
              '*': {
                boxSizing: 'border-box',
                fontSize: '16px',
                fontFamily: 'Roboto, sans-serif',
              },
              'input, textarea, button, select, label, a': {
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
              },
            }}
          />
          <Provider store={store}>
            <Monthly />
          </Provider>
        </>
      </AppContainer>
    );
  }
}

export default App;
