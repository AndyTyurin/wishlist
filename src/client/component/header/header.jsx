import React from 'react';
import PropTypes from 'prop-types';

import { Theme } from 'wl/util';

import styles from './header.scss';

@Theme(styles, 'Header')
export class Header extends React.Component {
  static propTypes = {
    wishlistItems: PropTypes.number,
    theme: PropTypes.func.isRequired
  };

  static defaultProps = {
    wishlistItems: 0
  };

  render() {
    const { wishlistItems, theme } = this.props;
    return (
      <div className={theme('header')}>
        <ul className={theme('navigation')}>
          <li className={theme('navigation-link')}>
            <a href="/">Products</a>
          </li>
          <li className={theme('navigation-link')}>
            <a href="/wishlist">My wishlist</a>
          </li>
        </ul>
        <a href="/wishlist" className={theme('wishlist-num')}>
          You wishlist has {wishlistItems} items
        </a>
      </div>
    );
  }
}

export default Header;
