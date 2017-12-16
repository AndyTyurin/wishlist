import React from 'react';
import PropTypes from 'prop-types';

export function ThemeProvider(styles) {
  return WrapperComponent =>
    class extends React.Component {
      static childContextTypes = {
        styles: PropTypes.object.isRequired
      };

      getChildContext() {
        return {
          styles
        };
      }

      render() {
        return <WrapperComponent {...this.props} styles={undefined} />;
      }
    };
}

export default ThemeProvider;
