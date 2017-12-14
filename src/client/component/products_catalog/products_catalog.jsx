import React from 'react';
import PropTypes from 'prop-types';

import { Theme } from 'wl/util';

import { Product, productPropTypes } from './../product/product';

import styles from './products_catalog.scss';

@Theme(styles, 'ProductCatalog')
export class ProductsCatalog extends React.Component {
  static propTypes = {
    products: PropTypes.arrayOf(productPropTypes),
    theme: PropTypes.func.isRequired
  };

  static defaultProps = {
    products: []
  };

  render() {
    const { theme } = this.props;
    return (
      <div className={theme('products-catalog')}>{this.renderProducts()}</div>
    );
  }

  renderProducts() {
    const { products, theme } = this.props;

    return products.map(product => (
      <div className={theme('product')}>
        <Product {...product} />
      </div>
    ));
  }
}

export default ProductsCatalog;
