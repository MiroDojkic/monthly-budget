import * as React from 'react';
import Loader from '../Loader';
import Monthly from '../Monthly';

import './styles.scss';

export default class App extends React.Component {
  render() {
    return this.props.loading ? <Loader /> : <Monthly {...{ ...this.props }} />;
  }
}
