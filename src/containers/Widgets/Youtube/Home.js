import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

@connect(
  state => ({
    user: state.auth.user,
  }), {replace})
export default class YoutubeHome extends PureComponent {
  componentWillMount() {
    this.props.replace('/widgets/youtube/prefs');
  }
  render() {
    // const styles = require('./Widgets.scss');
    return (
      <div>
        Виджет чата: отображение чата, опросы.
      </div>
    );
  }
}
