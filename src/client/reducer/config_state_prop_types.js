import PropTypes from 'prop-types';

export const configStatePropTypes = PropTypes.shape({
  baseUri: PropTypes.string.isRequired,
  apiUri: PropTypes.string.isRequired,
  protocol: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  port: PropTypes.number.isRequired,
  appVersion: PropTypes.string.isRequired
});

export default configStatePropTypes;
