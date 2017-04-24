import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';


@connect(
  state => ({
    user: state.auth.user,
  }))
export default class ProfilePrefs extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        Prefs of profile {this.props.user.username}
      </div>
    );
  }
}
