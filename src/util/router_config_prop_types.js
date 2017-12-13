import PropTypes from 'prop-types';

export const routerConfigPropTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default routerConfigPropTypes;
