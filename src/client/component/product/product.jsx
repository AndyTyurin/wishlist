/* eslint-disable react/default-props-match-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { autobind } from 'core-decorators';

import { Theme, ThemeProvider } from 'wl/util';

import Label from './../label/label';
import Heading from './../heading/heading';
import Icon from './../icon/icon';

import styles from './product.scss';
import labelStyles from './label.scss';
import headingStyles from './heading.scss';

export const productPropTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  imageSource: PropTypes.string.isRequired,
  desired: PropTypes.bool,
  onClick: PropTypes.func
};

const TITLE_SHORT_LENGTH = 20;
const SUB_TITLE_SHORT_LENGTH = 32;

@Theme(styles, 'Product')
@ThemeProvider({
  Heading: headingStyles
})
export class Product extends React.Component {
  static propTypes = {
    ...productPropTypes,
    theme: PropTypes.func.isRequired,
    onProductLoad: PropTypes.func
  };

  static defaultProps = {
    desired: false,
    onClick: noop,
    onProductLoad: noop
  };

  static getShortTitleName(title) {
    if (title.length > TITLE_SHORT_LENGTH) {
      title = `${title.substr(0, TITLE_SHORT_LENGTH)}...`;
    }

    return title;
  }

  static getShortSubtitleName(subTitle) {
    if (subTitle.length > SUB_TITLE_SHORT_LENGTH) {
      subTitle = `${subTitle.substr(0, SUB_TITLE_SHORT_LENGTH)}...`;
    }

    return subTitle;
  }

  render() {
    const {
      title, subTitle, imageSource, desired, theme
    } = this.props;
    const { getShortSubtitleName, getShortTitleName } = this.constructor;

    return (
      <div className={theme('product')}>
        <div className={theme('product-image')} onClick={this.handleClick}>
          <img
            src={imageSource}
            alt={`${title} | ${subTitle}`}
            onLoad={this.handleImageLoad}
          />
        </div>
        <div className={theme('product-description')}>
          <div className={theme('product-name')}>
            <Heading size="s">{getShortTitleName(title)}</Heading>
            <Label size="s" styles={labelStyles}>
              {getShortSubtitleName(subTitle)}
            </Label>
          </div>
          <div className={theme('wishlist-icon')} onClick={this.handleClick}>
            <Icon name="heart" active={desired} />
          </div>
        </div>
      </div>
    );
  }

  @autobind
  handleClick() {
    this.props.onClick(this.props.id);
  }

  @autobind
  handleImageLoad() {
    this.props.onProductLoad();
  }
}

export default Product;
