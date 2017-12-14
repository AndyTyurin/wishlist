import PropTypes from 'prop-types';

export const searchStatePropTypes = {
  search: {
    lastSuccessQuery: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    isProgress: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
  }
};

export default searchStatePropTypes;
