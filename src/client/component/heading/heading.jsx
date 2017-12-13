import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { Theme } from 'wl/util';

import styles from './heading.scss';

@Theme(styles, 'Heading')
export class Heading extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    theme: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl'])
  };

  static defaultProps = {
    size: 'm'
  };

  render() {
    const { theme, size, children } = this.props;
    const props = { ...omit(this.props, ['theme', 'size', 'children']) };

    props.className = theme('heading', `size_${size}`);

    let el;

    switch (size) {
      case 's':
        el = <h4 {...props}>{children}</h4>;
        break;
      case 'm':
        el = <h3 {...props}>{children}</h3>;
        break;
      case 'l':
        el = <h2 {...props}>{children}</h2>;
        break;
      case 'xl':
        el = <h1 {...props}>{children}</h1>;
        break;
      default:
        el = <h5 {...props}>{children}</h5>;
    }

    return el;
  }
}

export default Heading;
