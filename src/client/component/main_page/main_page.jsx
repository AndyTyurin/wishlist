import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';

import { searchActions, searchActionsPropTypes } from 'wl/client/action';
import { searchStatePropTypes } from 'wl/client/reducer';

// import styles from './main_page.scss';

const mapStateToProps = state => pick(state, ['search']);
const mapDispatchToProps = dispatch =>
  mapValues({ searchActions }, actionCreators =>
    bindActionCreators(actionCreators, dispatch)
  );

@connect(mapStateToProps, mapDispatchToProps)
export class MainPage extends React.Component {
  static propTypes = {
    ...searchActionsPropTypes,
    ...searchStatePropTypes
  };

  render() {
    return <div>Main page</div>;
  }
}

export default MainPage;
