import PropTypes from 'prop-types';

export const wishlistActionsPropTypes = PropTypes.shape({
  addToWishlist: PropTypes.func.isRequired,
  removeFromWishlist: PropTypes.func.isRequired,
  getWishlist: PropTypes.func.isRequired
});

export default wishlistActionsPropTypes;
