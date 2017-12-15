import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { Theme } from 'wl/util';

import { Product, productPropTypes } from './../product/product';

import styles from './products_catalog.scss';

@Theme(styles, 'ProductCatalog')
export class ProductsCatalog extends React.Component {
  static propTypes = {
    products: PropTypes.arrayOf(productPropTypes),
    theme: PropTypes.func.isRequired,
    onProductClick: PropTypes.func
  };

  static defaultProps = {
    products: [],
    onProductClick: noop
  };

  render() {
    const { theme } = this.props;
    return (
      <div className={theme('products-catalog')}>
        <div className={theme('content')}>{this.renderProducts()}</div>
      </div>
    );
  }

  renderProducts() {
    const { products, theme } = this.props;

    return products.map(product => (
      <div className={theme('product')}>
        <Product {...product} onClick={this.props.onProductClick} />
      </div>
    ));
  }
}

export default ProductsCatalog;
