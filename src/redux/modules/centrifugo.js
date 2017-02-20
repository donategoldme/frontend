const CENTRIFUGO_CONNECTING = 'donategold.me/centrifugo/CENTRIFUGO_CONNECTING';
const CENTRIFUGO_CONNECTED_SUCCESS = 'donategold.me/centrifugo/CENTRIFUGO_CONNECTED_SUCCEESS';
const CENTRIFUGO_CONNECTED_FAIL = 'donategold.me/centrifugo/CENTRIFUGO_CONNECTED_FAIL';
const CENTRIFUGO_CLOSE = 'donategold.me/centrifugo/CENTRIFUGO_CLOSE';
const CENTRIFUGO_DISCONNECTING = 'donategold.me/centrifugo/CENTRIFUGO_DISCONNECTING';
const SUBSCRIBE = 'donategold.me/centrifugo/SUBSCRIBE';

export function connecting() {
  return {
    type: CENTRIFUGO_CONNECTING,
    connecting: true,
  };
}

export function connected(client) {
  return {
    type: CENTRIFUGO_CONNECTED_SUCCESS,
    cgo: client,
    connected: true,
    connecting: false,
  };
}

export function connectedFail(error) {
  return {
    type: CENTRIFUGO_CONNECTED_FAIL,
    action: error,
    connecting: false
  };
}

export function disconnecting() {
  return {
    type: CENTRIFUGO_DISCONNECTING,
  };
}

export function closeCGO() {
  return {
    type: CENTRIFUGO_CLOSE
  };
}

export function subscribe(ch, callback) {
  return {
    type: SUBSCRIBE,
    ch: ch,
    callback: callback,
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
        connected: true,
        cgo: action.cgo,
      };
    case CENTRIFUGO_CONNECTED_FAIL:
      return {
        connecting: false,
        connected: false,
        error: action.error
      };
    case CENTRIFUGO_CLOSE:
      state.cgo.disconnect();
      return {
        connected: false,
        connecting: false
      };
    case CENTRIFUGO_DISCONNECTING:
      return {
        connecting: false,
        connected: false
      };
    case SUBSCRIBE:
      state.cgo.subscribe(action.ch, action.callback);
      return state;
    default:
      return state;
  }
}

export function isConnected(cgoState) {
  return cgoState.connected || cgoState.connecting;
}
