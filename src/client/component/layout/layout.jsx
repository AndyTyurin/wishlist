/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import { renderRoutes } from 'react-router-config';

import { Theme, routerConfigPropTypes } from 'wl/util';
import { wishlistActions, wishlistActionsPropTypes } from 'wl/client/action';
import { wishlistStatePropTypes } from 'wl/client/reducer';

import Header from './../header/header';

import styles from './layout.scss';

const mapStateToProps = state => pick(state, ['wishlist']);
const mapDispatchToProps = dispatch =>
  mapValues({ wishlistActions }, actionCreators =>
    bindActionCreators(actionCreators, dispatch)
  );

@Theme(styles, 'Layout')
@connect(mapStateToProps, mapDispatchToProps)
export class Layout extends React.PureComponent {
  static propTypes = {
    ...routerConfigPropTypes,
    ...wishlistActionsPropTypes,
    ...wishlistStatePropTypes
  };

  componentDidMount() {
    console.log('call');
    this.props.wishlistActions.getWishlist();
  }

  render() {
    const { theme, wishlist: { products } } = this.props;

    return (
      <div className={theme('layout')}>
        <Header wishlistItems={products.length} />
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

export default Layout;
