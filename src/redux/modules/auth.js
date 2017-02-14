const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const GET_URL_AUTH = 'redux-example/auth/GET_URL_AUTH';
const GET_URL_AUTH_SUCCESS = 'redux-example/auth/GET_URL_AUTH_SUCCESS';
const GET_URL_AUTH_FAIL = 'redux-example/auth/GET_URL_AUTH_FAIL';

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.user,
        centrifugo: action.result.centrifugo
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result.user,
        centrifugo: action.result.centrifugo
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case GET_URL_AUTH:
      return {
        ...state,
      };
    case GET_URL_AUTH_SUCCESS:
      return {
        ...state,
        authUrlTwitch: action.result
      };
    case GET_URL_AUTH_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/users/user')
  };
}

export function getUrlAuth(provider) {
  return {
    types: [GET_URL_AUTH, GET_URL_AUTH_SUCCESS, GET_URL_AUTH_FAIL],
    promise: (client) => client.get(`/auth/${provider}`)
  };
}

export function login(provider, data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.get(`/auth/${provider}/callback`, {params: data})
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.post('/users/logout', {})
  };
}
