import * as React from 'react';
import { injectGlobal } from 'emotion';
import { AppContainer } from 'react-hot-loader';
import Monthly from '../Monthly';
import StorageProvider from '../Storage';

import('./font.css');

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
        <StorageProvider>
          <Monthly />
        </StorageProvider>
      </AppContainer>
    );
  }
}

export default App;
