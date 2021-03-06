import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Col, Nav, Navbar, NavItem} from 'react-bootstrap';
import Helmet from 'react-helmet';

import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import {isLoaded as isBalanceLoaded, load as loadBalance} from 'redux/modules/balance';
import * as cgoActions from 'redux/modules/centrifugo';
import {closeCGO} from 'redux/modules/centrifugo';
import { UserInfo } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import centrifugoCl from 'helpers/CentrifugoWs';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    if (!isBalanceLoaded(getState())) {
      promises.push(dispatch(loadBalance()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user, centrifugo: state.auth.centrifugo, balance: state.balance,
  cgo: state.centrifugo}),
  {logout, pushState: push, cgoCl: centrifugoCl, disconnectCGO: closeCGO})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    centrifugo: PropTypes.object,
    balance: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    cgoCl: PropTypes.func.isRequired,
    disconnectCGO: PropTypes.func.isRequired,
    cgo: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (this.props.user && __CLIENT__ && !cgoActions.isConnected(this.props.cgo)) {
      this.props.cgoCl(this.props.user.id, this.props.user.username, this.props.centrifugo.timestamp, this.props.centrifugo.token);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(!this.props.user && nextProps.user && __CLIENT__ && !cgoActions.isConnected(this.props.cgo));
    if (nextProps && !this.props.user && nextProps.user && __CLIENT__ && !cgoActions.isConnected(this.props.cgo)) {
      this.props.cgoCl(nextProps.user.id, nextProps.user.username, nextProps.centrifugo.timestamp, nextProps.centrifugo.token);
    }
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // console.log(this.props.disconnectCGO, closeCGO);
      // this.props.disconnectCGO();
      // logout
      this.props.pushState('/');
      this.props.dispatch(closeCGO());
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user, balance} = this.props;
    const styles = require('./App.scss');
    return (
      <div>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar>
              {user &&
                <LinkContainer to="/widgets/chats">
                  <NavItem>Chats</NavItem>
                </LinkContainer>
              }
              {user &&
                <LinkContainer to="/widgets/standard">
                  <NavItem>Standard</NavItem>
                </LinkContainer>
              }
              {user &&
                <LinkContainer to="/widgets/youtube">
                  <NavItem>YoutubeDJ</NavItem>
                </LinkContainer>
              }

              {user &&
                <LinkContainer to="/profile">
                  <NavItem>Profile</NavItem>
                </LinkContainer>
              }

              {!user &&
              <LinkContainer to="/auth/twitch/callback">
              <NavItem>Twitch</NavItem>
              </LinkContainer>}
              {!user &&
              <LinkContainer to="/auth/gplus/callback">
              <NavItem>Youtube</NavItem>
              </LinkContainer>}
              {!user &&
              <LinkContainer to="/auth/peka2tv/callback">
              <NavItem>Peka2TV</NavItem>
              </LinkContainer>}
              {!user &&
              <LinkContainer to="/auth/goodgame/callback">
              <NavItem>Goodgame</NavItem>
              </LinkContainer>}

              {user &&
              <LinkContainer to="/logout">
                <NavItem eventKey={7} className="logout-link" onClick={this.handleLogout}>
                  Logout
                </NavItem>
              </LinkContainer>}
            </Nav>
            <UserInfo user={user} balance={balance}/>
          </Navbar.Collapse>
        </Navbar>
        <div className={styles.appContent}>
          <Col xs={12} md={12}>
          {this.props.children}
          </Col>
        </div>
      </div>
    );
  }
}
