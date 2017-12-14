/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import { renderRoutes } from 'react-router-config';

import { Theme, routerConfigPropTypes } from 'wl/util';

import Header from './../header/header';

import styles from './layout.scss';

@Theme(styles, 'Layout')
export class Layout extends React.PureComponent {
  static propTypes = {
    ...routerConfigPropTypes
  };

  render() {
    const { theme } = this.props;

    return (
      <div className={theme('layout')}>
        <Header />
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

export default Layout;
