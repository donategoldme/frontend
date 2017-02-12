import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import * as authActions from 'redux/modules/auth';

function getDataTwitch(query) {
  if (!!query.code) {
    return {'code': query.code, 'scope': query.scope, 'state': query.state};
  }
  return undefined;
}

function getDataGoogle(query) {
  if (!!query.code) {
    return {'code': query.code, 'state': query.state};
  }
  return undefined;
}

@connect(
  state => ({auth: state.auth}),
  {...authActions, push})
export default class Login extends Component {
  static propTypes = {
    auth: PropTypes.object,
    history: PropTypes.object,
    params: PropTypes.object,
    location: PropTypes.object,
    push: PropTypes.func.isRequired,
    login: PropTypes.func,
    getUrlAuth: PropTypes.func,
    logout: PropTypes.func
  }

  componentWillMount() {
    if (!__SERVER__ && !this.props.auth.user) {
      let data = undefined;
      switch (this.props.params.provider) {
        case 'twitch':
          data = getDataTwitch(this.props.location.query);
          break;
        case 'gplus':
          data = getDataGoogle(this.props.location.query);
          break;
        default:
          data = undefined;
      }
      if (!!data) {
        if (!this.props.auth.loggingIn) {
          this.props.login(this.props.params.provider, data);
        }
      } else {
        this.props.getUrlAuth(this.props.params.provider).then(res => window.location = res);
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {auth, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!auth.user &&
        <div>
          <p>Сейчас вы будуте перенаправлены на страницу логина выбранного провайдера. Если этого не произошло, обновите страницу.</p>
        </div>
        }
        {auth.user &&
        <div>
          <p>You are currently logged in as {auth.user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
