import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

// @connect(() => {})
export default class Profile extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    // const styles = require('./Widgets.scss');
    return (
      <div>
        <Nav bsStyle="pills" stacked activeKey={1} className={'col-md-2'}>
          <LinkContainer to="/profile/prefs">
            <NavItem>Настройки</NavItem>
          </LinkContainer>
          <LinkContainer to="/profile/providers">
            <NavItem>Аккаунты</NavItem>
          </LinkContainer>
        </Nav>
        <Helmet title="Профиль"/>
        <div className={'col-md-10'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

// export default connect()(ChatsWidgets);
