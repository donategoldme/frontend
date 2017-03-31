import * as actions from './actions';

function getPollReducer(state, action) {
  switch (action.type) {
    case actions.GET_POLL:
      return state;
    case actions.GET_POLL_SUCCESS:
      console.log(!state.poll.time);
      console.log(state.poll.time < action.result.time);
      if (!state.poll.time || state.poll.time < action.result.time) {
        return {
          ...state,
          poll: action.result,
        };
      }
      return state;
    case actions.GET_POLL_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function savePollReducer(state, action) {
  switch (action.type) {
    case actions.SAVE_POLL:
      return state;
    case actions.SAVE_POLL_SUCCESS:
      return {
        ...state,
        poll: action.result,
        pollAdd: false,
      };
    case actions.SAVE_POLL_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function deletePollReducer(state, action) {
  switch (action.type) {
    case actions.DELETE_POLL:
      return state;
    case actions.DELETE_POLL_SUCCESS:
      return {
        ...state,
        poll: {},
      };
    case actions.DELETE_POLL_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function pollAddReducer(state, action) {
  switch (action.type) {
    case actions.POLL_ADD:
      console.log(state.pollAdd);
      return {
        ...state,
        pollAdd: !state.pollAdd,
      };
    default:
      return state;
  }
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_POLL:
    case actions.GET_POLL_SUCCESS:
    case actions.GET_POLL_FAIL:
      return getPollReducer(state, action);
    case actions.SAVE_POLL:
    case actions.SAVE_POLL_SUCCESS:
    case actions.SAVE_POLL_FAIL:
      return savePollReducer(state, action);
    case actions.DELETE_POLL:
    case actions.DELETE_POLL_SUCCESS:
    case actions.DELETE_POLL_FAIL:
      return deletePollReducer(state, action);
    case actions.POLL_ADD:
      return pollAddReducer(state, action);
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state.chatsWidget && state.chatsWidget.poll;
}
