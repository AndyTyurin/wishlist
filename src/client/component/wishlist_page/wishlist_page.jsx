import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';

import { wishlistActions, wishlistActionsPropTypes } from 'wl/client/action';
import { wishlistStatePropTypes } from 'wl/client/reducer';

// import styles from './wishlist.scss';

const mapStateToProps = state => pick(state, ['wishlist']);
const mapDispatchToProps = dispatch =>
  mapValues({ wishlistActions }, actionCreators =>
    bindActionCreators(actionCreators, dispatch)
  );

@connect(mapStateToProps, mapDispatchToProps)
export class WishlistPage extends React.Component {
  static propTypes = {
    ...wishlistActionsPropTypes,
    ...wishlistStatePropTypes
  };

  render() {
    return <div>Wishlist page</div>;
  }
}

export default WishlistPage;
