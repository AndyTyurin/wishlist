import isNil from 'lodash/isNil';

import { createCustomProperty } from './create_custom_property';

function dictionaryValidator(isRequired = false) {
  return (props, propName) => {
    props = props || {};

    const dictionaryProp = props[propName];

    if (typeof dictionaryProp === 'undefined') {
      if (isRequired) {
        throw new Error();
      } else {
        if (typeof dictionaryProp !== 'object') {
          return new Error('Not valid dictionary passed to react component, prefer to use key-value pair');
        }

        const isDictionaryValueNotValid = (playerId) => {
          const dictionaryValue = dictionaryProp[playerId];

          return isNil(dictionaryValue);
        };

        return Object.keys(dictionaryProp).find(isDictionaryValueNotValid)
          ? new Error('Dictionary value is not valid, prefer to use string/number key and not null or undefined value')
          : null;
      }
    }

    return null;
  };
}

export const dictionaryPropType = createCustomProperty(dictionaryValidator);

export default dictionaryPropType;
