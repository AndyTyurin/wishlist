import React from 'react';
import PropTypes from 'prop-types';

import { Theme } from 'wl/util';

import styles from './label.scss';

@Theme(styles, 'Label')
export class Label extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    theme: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
    mode: PropTypes.oneOf(['hint', 'normal', 'important'])
  };

  static defaultProps = {
    size: 'm',
    mode: 'normal'
  };

  render() {
    const {
      theme, size, children, mode
    } = this.props;

    return (
      <span className={theme('label', `size_${size}`, `mode_${mode}`)}>
        {children}
      </span>
    );
  }
}

export default Label;
