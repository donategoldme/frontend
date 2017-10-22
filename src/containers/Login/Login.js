import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import * as authActions from 'redux/modules/auth';

function getData(query) {
  if (!!query.code) {
    return {'code': query.code, 'scope': query.scope, 'state': query.state};
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
    login: PropTypes.func.isRequired,
    getUrlAuth: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (__CLIENT__) {
      let data = undefined;
      data = getData(this.props.location.query);
      if (!!data) {
        this.props.login(this.props.params.provider, data);
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
          <p>You are currently logged in as {auth.user.username}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
