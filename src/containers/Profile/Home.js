import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';


@connect(
  state => ({
    user: state.auth.user,
  }), {replace})
export default class ProfileHome extends PureComponent {
  componentWillMount() {
    this.props.replace('/profile/prefs');
  }
  render() {
    console.log(this.props);
    return (
      <div>
        Prefs of profile
      </div>
    );
  }
}
