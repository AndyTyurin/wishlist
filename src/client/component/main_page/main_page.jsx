import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import debounce from 'lodash/debounce';
import find from 'lodash/find';
import { autobind } from 'core-decorators';

import {
  searchActions,
  searchActionsPropTypes,
  wishlistActions,
  wishlistActionsPropTypes
} from 'wl/client/action';
import {
  searchStatePropTypes,
  wishlistStatePropTypes
} from 'wl/client/reducer';
import { productsSelectors } from 'wl/client/select';
import { Theme, ThemeProvider, Memoize } from 'wl/util';
import Heading from './../heading/heading';
import TextInput from './../text_input/text_input';
import { productPropTypes } from './../product/product';

import styles from './main_page.scss';
import textInputStyles from './text_input.scss';
import labelStyles from './label.scss';
import { ProductsCatalog } from '../products_catalog/products_catalog';

const mapStateToProps = state => pick(state, ['search', 'wishlist']);
const mapDispatchToProps = dispatch =>
  mapValues({ searchActions, wishlistActions }, actionCreators =>
    bindActionCreators(actionCreators, dispatch)
  );

const SEARCH_HINT = 'What are you seeking for?';
const SEARCH_DEBOUNCE_TIME_MS = 500;

@connect(mapStateToProps, mapDispatchToProps)
@Theme(styles, 'MainPage')
@ThemeProvider({
  TextInput: textInputStyles,
  Label: labelStyles
})
@Memoize({
  products: productsSelectors.getProducts
})
export class MainPage extends React.Component {
  static propTypes = {
    searchActions: searchActionsPropTypes.isRequired,
    wishlistActions: wishlistActionsPropTypes.isRequired,
    ...searchStatePropTypes,
    ...wishlistStatePropTypes,
    products: PropTypes.arrayOf(PropTypes.shape(productPropTypes)).isRequired,
    theme: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      productsLoaded: false
    };
  }

  componentDidMount() {
    this.fetchContent = debounce(this.fetchContent, SEARCH_DEBOUNCE_TIME_MS);
  }

  render() {
    const { theme } = this.props;
    const { query } = this.state;

    return (
      <div className={theme('main-page')}>
        <div className={theme('search')}>
          <Heading size="xl">Find your best</Heading>
          <TextInput
            value={query}
            iconName={this.getSearchSpinnerIconName()}
            onChange={this.handleSearchQueryChange}
            placeholder={SEARCH_HINT}
            label="For example: Stan Smith"
          />
        </div>
        {this.renderProductsCatalog()}
      </div>
    );
  }

  renderProductsCatalog() {
    const { products, theme, search: { isProgress } } = this.props;
    const { productsLoaded } = this.state;
    const hiddenClassName =
      isProgress || !productsLoaded ? 'products-hidden' : undefined;
    return (
      <div className={theme('products', hiddenClassName)}>
        <ProductsCatalog
          products={products}
          onProductClick={this.handleProductClick}
          onProductsLoad={this.handleProductsLoad}
        />
      </div>
    );
  }

  @autobind
  handleSearchQueryChange(value) {
    this.setState({
      query: value
    });
    this.fetchContent(value);
  }

  @autobind
  handleProductClick(id) {
    const {
      wishlistActions: { addToWishlist, removeFromWishlist },
      wishlist: { products },
      search: { products: searchProducts }
    } = this.props;
    const product = find(products, { id });

    if (product) {
      removeFromWishlist(id);
    } else {
      addToWishlist(find(searchProducts, { id }));
    }
  }

  @autobind
  handleProductsLoad() {
    this.setState({
      productsLoaded: true
    });
  }

  fetchContent(value) {
    const { searchActions: { changeSearchQuery } } = this.props;

    this.setState({
      productsLoaded: false
    });

    changeSearchQuery(value);
  }

  getSearchSpinnerIconName() {
    return this.props.search.isProgress ? 'spinner' : '';
  }
}

export default MainPage;
