import PropTypes from 'prop-types';

export const searchStatePropTypes = {
  wishlist: PropTypes.shape({
    products: PropTypes.array.isRequired,
    isProgress: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
  })
};

export default searchStatePropTypes;
