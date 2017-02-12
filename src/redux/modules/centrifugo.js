const CENTRIFUGO_CONNECTING = 'centrifugo/CENTRIFUGO_CONNECTING';
const CENTRIFUGO_CONNECTED_SUCCESS = 'centrifugo/CENTRIFUGO_CONNECTED_SUCCEESS';
const CENTRIFUGO_CONNECTED_FAIL = 'centrifugo/CENTRIFUGO_CONNECTED_FAIL';
const CENTRIFUGO_CLOSE = 'centrifugo/CENTRIFUGO_CLOSE';

export function connecting() {
  return {
    type: CENTRIFUGO_CONNECTING,
    action: {}
  };
}

export function connected() {
  return {
    type: CENTRIFUGO_CONNECTED_SUCCESS
  };
}

export function connectedFail(error) {
  return {
    type: CENTRIFUGO_CONNECTED_FAIL,
    action: error
  };
}

export function close() {
  return {
    type: CENTRIFUGO_CLOSE
  };
}

const initialState = {
  connected: false,
  connecting: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CENTRIFUGO_CONNECTING:
      return {
        connecting: true,
        connected: false
      };
    case CENTRIFUGO_CONNECTED_SUCCESS:
      return {
        connecting: false,
        connected: true
      };
    case CENTRIFUGO_CONNECTED_FAIL:
      return {
        connecting: false,
        connected: false,
        error: action.error
      };
    case CENTRIFUGO_CLOSE:
      return {
        connecting: false,
        connected: false
      };
    default:
      return state;
  }
}
