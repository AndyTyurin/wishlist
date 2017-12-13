import React from 'react';
import PropTypes from 'prop-types';
import compact from 'lodash/compact';

/**
 * Css module decorator.
 *
 * @param {Object} styles CSS module with styles to override.
 * @param {String} [id] Component's identifier.
 * @param {Boolean} [options.extendClass] Should extend class by adding after original class.
 * @param {Boolean} [options.debug] In debug mode displays rewritten styles.
 */
export function Theme(styles, id, { extendClass = true, debug = false } = {}) {
  id =
    id ||
    Math.random()
      .toString(36)
      .substring(7);

  return WrappedComponent =>
    class extends React.Component {
      static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        styles: PropTypes.object
      };

      static defaultProps = {
        styles: null
      };

      static contextTypes = {
        styles: PropTypes.object
      };

      static mergeStyles(actualStyles, stylesToMerge) {
        Object.keys(stylesToMerge).forEach((key) => {
          const className = stylesToMerge[key];

          if (actualStyles[key]) {
            if (debug) {
              console.log(
                `Override style '${key}' with new className identifier '${className}'`
              );
            }

            actualStyles[key] = extendClass
              ? `${actualStyles[key]} ${className}`
              : className;
          }
        });

        return actualStyles;
      }

      _mixedStyles;

      constructor(props) {
        super(props);

        this._mixedStyles = null;
      }

      themeFn = (...keys) =>
        compact(keys)
          .map((key) => {
            const value = this._mixedStyles[key];

            if (typeof value === 'undefined' || value === null) {
              const err = new Error(`Can't find style '${key}'`);
              console.warn(err.stack);
            }

            return this._mixedStyles[key];
          })
          .join(' ');

      render() {
        if (!this._mixedStyles) {
          const contextStyles = (this.context.styles || {})[id];
          const propStyles = this.props.styles;

          this._mixedStyles = { ...styles };

          if (contextStyles) {
            this.constructor.mergeStyles(this._mixedStyles, contextStyles);
          }

          if (propStyles) {
            this.constructor.mergeStyles(this._mixedStyles, propStyles);
          }
        }

        return <WrappedComponent {...this.props} theme={this.themeFn} />;
      }
    };
}

export default Theme;
