import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';

import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import {isLoaded as isBalanceLoaded, load as loadBalance} from 'redux/modules/balance';
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
  state => ({user: state.auth.user, centrifugo: state.auth.centrifugo, balance: state.balance}),
  {logout, pushState: push, cgoCl: centrifugoCl})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    centrifugo: PropTypes.object,
    balance: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    cgoCl: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (this.props.user && __CLIENT__) {
      this.props.cgoCl(this.props.user.id, this.props.user.username, this.props.centrifugo.timestamp, this.props.centrifugo.token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
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
      <div className={styles.app}>
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
              {user && <LinkContainer to="/widgets">
                <NavItem>Widgets</NavItem>
              </LinkContainer>}

              {!user &&
              <LinkContainer to="/auth/twitch/callback">
              <NavItem>Twitch</NavItem>
              </LinkContainer>}
              {!user &&
              <LinkContainer to="/auth/gplus/callback">
              <NavItem>Youtube</NavItem>
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
          {this.props.children}
        </div>
      </div>
    );
  }
}
