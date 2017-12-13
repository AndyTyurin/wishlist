import React from 'react';
import PropTypes from 'prop-types';

import { Theme } from 'wl/util';

import styles from './icon.scss';

@Theme(styles)
export class Icon extends React.Component {
  static propTypes = {
    theme: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool
  };

  static defaultProps = {
    active: false
  };

  render() {
    return <span className={this.getIconClassName()} />;
  }

  getIconClassName() {
    const { theme, name, active } = this.props;
    return `${theme('icon')} ${theme(`name-${name}`)}${active
      ? ` ${theme('active')}`
      : ''}`;
  }
}

export default Icon;
