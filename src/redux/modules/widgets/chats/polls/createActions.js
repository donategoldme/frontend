import * as actions from './actions';

export function getPoll() {
  return {
    types: [actions.GET_POLL, actions.GET_POLL, actions.GET_POLL_FAIL],
    promise: (client) => client.get('/widgets/chats/polls')
  };
}

export function getPollWS(poll) {
  return {
    type: actions.GET_POLL_SUCCESS,
    result: poll,
  };
}

export function savePoll(poll) {
  console.log(poll);
  return {
    types: [actions.SAVE_POLL, actions.SAVE_POLL, actions.SAVE_POLL_FAIL],
    promise: (client) => client.post('/widgets/chats/polls', {data: poll})
  };
}

export function savePollWS(poll) {
  return {
    type: actions.SAVE_POLL_SUCCESS,
    result: poll,
  };
}

export function removePoll() {
  return {
    types: [actions.DELETE_POLL, actions.DELETE_POLL, actions.DELETE_POLL_FAIL],
    promise: (client) => client.del('/widgets/chats/polls')
  };
}

export function removePollWS() {
  return {
    type: actions.DELETE_POLL_SUCCESS,
  };
}

export function pollAdd() {
  return {
    type: actions.POLL_ADD,
  };
}
