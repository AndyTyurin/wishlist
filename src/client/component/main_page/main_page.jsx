import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import debounce from 'lodash/debounce';
import { autobind } from 'core-decorators';

import { searchActions, searchActionsPropTypes } from 'wl/client/action';
import { searchStatePropTypes } from 'wl/client/reducer';
import { Theme, ThemeProvider } from 'wl/util';
import Heading from './../heading/heading';
import TextInput from './../text_input/text_input';

import styles from './main_page.scss';
import textInputStyles from './text_input.scss';
import { ProductsCatalog } from '../products_catalog/products_catalog';

const mapStateToProps = state => pick(state, ['search']);
const mapDispatchToProps = dispatch =>
  mapValues({ searchActions }, actionCreators =>
    bindActionCreators(actionCreators, dispatch)
  );

const SEARCH_HINT = 'What are you seeking for?';
const SEARCH_DEBOUNCE_TIME_MS = 500;

@connect(mapStateToProps, mapDispatchToProps)
@Theme(styles, 'MainPage')
@ThemeProvider({
  TextInput: textInputStyles
})
export class MainPage extends React.Component {
  static propTypes = {
    ...searchActionsPropTypes,
    ...searchStatePropTypes,
    theme: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      query: ''
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
          />
        </div>
        {this.renderProductsCatalog()}
      </div>
    );
  }

  renderProductsCatalog() {
    const { search: { products }, theme } = this.props;
    return (
      <div className={theme('products')}>
        <ProductsCatalog products={products} />
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

  fetchContent(value) {
    const { searchActions: { changeSearchQuery } } = this.props;
    changeSearchQuery(value);
  }

  getSearchSpinnerIconName() {
    return this.props.search.isProgress ? 'spinner' : '';
  }
}

export default MainPage;
