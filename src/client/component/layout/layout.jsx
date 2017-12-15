/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import { renderRoutes } from 'react-router-config';
import { autobind } from 'core-decorators';

import { Theme, routerConfigPropTypes } from 'wl/util';
import { wishlistActions, wishlistActionsPropTypes } from 'wl/client/action';
import { wishlistStatePropTypes } from 'wl/client/reducer';

import Header from './../header/header';
import { MAIN_PAGE_ROUTE, WISHLIST_PAGE_ROUTE } from './../../routes';

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
    this.props.wishlistActions.getWishlist();
  }

  render() {
    const { theme, wishlist: { products }, route: { routes } } = this.props;

    return (
      <div className={theme('layout')}>
        <Header
          wishlistItems={products.length}
          onWishlistClick={this.handleWishlistClick}
          onMainPageClick={this.handleMainPageClick}
        />
        {renderRoutes(routes)}
      </div>
    );
  }

  @autobind
  handleWishlistClick() {
    this.changeRoute(WISHLIST_PAGE_ROUTE);
  }

  @autobind
  handleMainPageClick() {
    this.changeRoute(MAIN_PAGE_ROUTE);
  }

  changeRoute(path) {
    const { history } = this.props;

    if (history.location.pathname !== path) {
      history.push(path);
    }
  }
}

export default Layout;
