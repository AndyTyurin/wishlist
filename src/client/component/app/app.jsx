/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import { routes } from './../../routes';

import './../global.scss';

class AppComponent extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  static childContextTypes = {
    history: PropTypes.object
  };

  getChildContext() {
    return {
      history: this.props.history
    };
  }

  render() {
    return renderRoutes(routes);
  }
}

export const App = withRouter(connect()(AppComponent));

export default App;
