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
import headingStyles from './heading.scss';

export const productPropTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
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
    theme: PropTypes.func.isRequired
  };

  static defaultProps = {
    desired: false,
    onClick: noop
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
        <div className={theme('product-header')}>
          <div className={theme('product-name')}>
            <Heading size="m">{getShortTitleName(title)}</Heading>
            <Label size="m">{getShortSubtitleName(subTitle)}</Label>
          </div>
          <div className={theme('wishlist-icon')} onClick={this.handleClick}>
            <Icon name="heart" active={desired} />
          </div>
        </div>
        <div className={theme('product-image')} onClick={this.handleClick}>
          <img src={imageSource} alt={`${title} | ${subTitle}`} />
        </div>
      </div>
    );
  }

  @autobind
  handleClick() {
    this.props.onClick(this.props.id);
  }
}

export default Product;
