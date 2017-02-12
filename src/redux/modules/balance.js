const BALANCE_LOADING = 'balance/BALANCE_LOADING';
const BALANCE_SUCCESS = 'balance/BALANCE_SUCCESS';
const BALANCE_FAIL = 'balance/BALANCE_FAIL';
const BALANCE_ADD = 'balance/BALANCE_ADD';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BALANCE_LOADING:
      return {
        ...state,
        loading: true
      };
    case BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        money: action.result.money,
        updated_at: action.result.updated_at
      };
    case BALANCE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        err: action.result
      };
    case BALANCE_ADD:
      return {
        ...state,
        money: state.money + action.result.money
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.balance && globalState.balance.loaded;
}

export function load() {
  return {
    types: [BALANCE_LOADING, BALANCE_SUCCESS, BALANCE_FAIL],
    promise: (client) => client.get('/money/balance')
  };
}

export function refreshBalance(balance) {
  return {
    type: BALANCE_SUCCESS,
    result: {
      money: balance
    }
  };
}

export function addToBalance(money) {
  return {
    type: BALANCE_ADD,
    result: {
      money: money
    }
  };
}
