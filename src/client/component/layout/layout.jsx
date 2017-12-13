/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import { renderRoutes } from 'react-router-config';

import { routerConfigPropTypes } from 'wl/util';

export class Layout extends React.PureComponent {
  static propTypes = {
    ...routerConfigPropTypes
  };

  render() {
    return renderRoutes(this.props.route.routes);
  }
}

export default Layout;
