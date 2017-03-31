import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

// @connect(() => {})
class ChatsWidgets extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    // const styles = require('./Widgets.scss');
    return (
      <div>
        <Nav bsStyle="pills" stacked activeKey={1} className={'col-md-2'}>
          <LinkContainer to="/widgets/chats/chat">
            <NavItem>Чат</NavItem>
          </LinkContainer>
          <LinkContainer to="/widgets/chats/polls">
            <NavItem>Голосование</NavItem>
          </LinkContainer>
          <LinkContainer to="/widgets/chats/connect">
            <NavItem>Подключение</NavItem>
          </LinkContainer>
          <LinkContainer to="/widgets/chats/prefs">
            <NavItem>Настройки</NavItem>
          </LinkContainer>
        </Nav>
        <Helmet title="Чаты"/>
        <div className={'col-md-10'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect()(ChatsWidgets);
