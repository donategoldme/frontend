import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

@connect(
  state => ({
    user: state.auth.user,
  }), {replace})
export default class ChatsWidgets extends PureComponent {
  componentWillMount() {
    this.props.replace('/widgets/chats/chat');
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
