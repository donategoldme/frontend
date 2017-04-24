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
const ADD_PROVIDER = 'donategold.me/auth/ADD_PROVIDER';
const REMOVE_PROVIDER = 'donategold.me/auth/REMOVE_PROVIDER';
const REMOVE_PROVIDER_SUCCESS = 'donategold.me/auth/REMOVE_PROVIDER_SUCCESS';
const REMOVE_PROVIDER_FAIL = 'donategold.me/auth/REMOVE_PROVIDER_FAIL';

const initialState = {
  loaded: false,
  providers: [],
};

function loadReducer(state, action) {
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
        providers: action.result.providers,
        centrifugo: action.result.centrifugo
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

function loginReducer(state, action) {
  switch (action.type) {
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
        providers: action.result.providers,
        centrifugo: action.result.centrifugo,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    default:
      return state;
  }
}

function logoutReducer(state, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        loaded: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

function getUrlAuthReducer(state, action) {
  switch (action.type) {
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

function providerReducer(state, action) {
  switch (action.type) {
    case ADD_PROVIDER:
      const providers = [...state.providers];
      const providersF = providers.filter((provider) => {
        return !(provider.uid === action.result.uid && provider.type_provider === action.result.type_provider);
      });
      providersF.push(action.result);
      return {
        ...state,
        providers: providersF,
      };
    case REMOVE_PROVIDER:
      return state;
    case REMOVE_PROVIDER_SUCCESS:
      const providersFiltered = state.providers.filter((provider) => {
        return provider.id !== action.result.id;
      });
      return {
        ...state,
        providers: providersFiltered,
      };
    case REMOVE_PROVIDER_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
    case LOAD_SUCCESS:
    case LOAD_FAIL:
      return loadReducer(state, action);
    case LOGIN:
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
      return loginReducer(state, action);
    case LOGOUT:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      return logoutReducer(state, action);
    case GET_URL_AUTH:
    case GET_URL_AUTH_SUCCESS:
    case GET_URL_AUTH_FAIL:
      return getUrlAuthReducer(state, action);
    case ADD_PROVIDER:
    case REMOVE_PROVIDER:
    case REMOVE_PROVIDER_SUCCESS:
    case REMOVE_PROVIDER_FAIL:
      return providerReducer(state, action);
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

export function addProvider(provider) {
  console.log(123);
  return {
    type: ADD_PROVIDER,
    result: provider,
  };
}

export function removeProvider(provider) {
  return {
    types: [REMOVE_PROVIDER, REMOVE_PROVIDER_SUCCESS, REMOVE_PROVIDER_FAIL],
    promise: (client) => client.del('/users/providers/' + provider.id),
  };
}
