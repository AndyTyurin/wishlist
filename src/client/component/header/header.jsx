import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { autobind } from 'core-decorators';

import { Theme } from 'wl/util';

import styles from './header.scss';

@Theme(styles, 'Header')
export class Header extends React.Component {
  static propTypes = {
    wishlistItems: PropTypes.number,
    onWishlistClick: PropTypes.func,
    onMainPageClick: PropTypes.func,
    theme: PropTypes.func.isRequired
  };

  static defaultProps = {
    wishlistItems: 0,
    onWishlistClick: noop,
    onMainPageClick: noop
  };

  render() {
    const { wishlistItems, theme } = this.props;

    return (
      <div className={theme('header')}>
        <ul className={theme('navigation')}>
          <li className={theme('navigation-link')}>
            <a href="/" onClick={this.handleMainPageClick}>
              Products
            </a>
          </li>
          <li className={theme('navigation-link')}>
            <a href="/wishlist" onClick={this.handleWishlistClick}>
              My wishlist
            </a>
          </li>
        </ul>
        <a
          href="/wishlist"
          onClick={this.handleWishlistClick}
          className={theme('wishlist-num')}
        >
          Your wishlist has {wishlistItems} items
        </a>
      </div>
    );
  }

  @autobind
  handleWishlistClick(e) {
    e.preventDefault();
    this.props.onWishlistClick();
  }

  @autobind
  handleMainPageClick(e) {
    e.preventDefault();
    this.props.onMainPageClick();
  }
}

export default Header;
