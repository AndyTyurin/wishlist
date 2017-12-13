import forEach from 'lodash/forEach';

export function shallowCompare(props, nextProps) {
  let equal = true;

  forEach(Object.keys(nextProps), (name) => {
    equal = props[name] === nextProps[name];
    return equal;
  });

  return equal;
}

export default shallowCompare;
