import React from 'react';
import mapValues from 'lodash/mapValues';

export function Memoize(selectors = {}) {
  return WrappedComponent =>
    class extends React.Component {
      render() {
        const selectorProps = mapValues(selectors, selector =>
          selector(this.props)
        );
        return <WrappedComponent {...this.props} {...selectorProps} />;
      }
    };
}

export default Memoize;
