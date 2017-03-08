import {
  normalize
} from 'normalizr';
import {
  chatsWidget
} from 'schema/chatsWidget';

const LOAD_CHATS = 'donategold.me/chats/LOAD_CHATS';
const LOAD_CHATS_SUCCESS = 'donategold.me/chats/LOAD_CHATS_SUCCESS';
const LOAD_CHATS_FAIL = 'donategold.me/chats/LOAD_CHATS_FAIL';
const ADD_CHAT = 'donategold.me/chats/ADD_CHAT';
const ADD_CHAT_SUCCESS = 'donategold.me/chats/ADD_CHAT_SUCCESS';
const ADD_CHAT_FAIL = 'donategold.me/chats/ADD_CHAT_FAIL';
const REMOVE_CHAT = 'donategold.me/chats/REMOVE_CHAT';
const REMOVE_CHAT_SUCCESS = 'donategold.me/chats/REMOVE_CHAT_SUCCESS';
const REMOVE_CHAT_FAIL = 'donategold.me/chats/REMOVE_CHAT_FAIL';
const OPEN_CHAT_FORM = 'donategold.me/chats/OPEN_CHAT_FORM';
const OPEN_CHAT = 'donategold.me/chats/OPEN_CHAT';
const ADD_MESSAGE = 'donategold.me/chats/ADD_MESSAGE';
const SCROLLING_CHAT = 'donategold.me/chats/SCROLLING_CHAT';
const OPEN_PREFS = 'donategold.me/chats/OPEN_PREFS';
const LOAD_PREFS = 'donategold.me/chats/LOAD_PREFS';
const LOAD_PREFS_SUCCESS = 'donategold.me/chats/LOAD_PREFS_SUCCESS';
const LOAD_PREFS_FAIL = 'donategold.me/chats/LOAD_PREFS_FAIL';
const SAVE_PREFS = 'donategold.me/chats/SAVE_PREFS';
const SAVE_PREFS_SUCCESS = 'donategold.me/chats/SAVE_PREFS_SUCCESS';
const SAVE_PREFS_FAIL = 'donategold.me/chats/SAVE_PREFS_FAIL';

const initialValues = {
  loaded: false,
  openChat: false,
  scrollChat: true,
  openChatForm: false,
  openPrefs: false,
  prefs: {},
  results: [],
  entities: {},
  messages: [],
  error: '',
};

function loadChatsReducer(state, action) {
  switch (action.type) {
    case LOAD_CHATS:
      return state;
    case LOAD_CHATS_SUCCESS:
      const res = normalize(action.result, [chatsWidget]);
      return {
        ...state,
        loaded: true,
        results: res.result || [],
        entities: res.entities.chats || {},
      };
    case LOAD_CHATS_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function addChatReducer(state, action) {
  switch (action.type) {
    case ADD_CHAT:
      return state;
    case ADD_CHAT_SUCCESS:
      const results = state.results.filter((id) => id !== action.result.id);
      results.push(action.result.id);
      const entities = {...state.entities};
      entities[action.result.id] = action.result;
      return {
        ...state,
        results: results,
        entities: entities,
      };
    case ADD_CHAT_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function removeChatReducer(state, action) {
  switch (action.type) {
    case REMOVE_CHAT:
      return state;
    case REMOVE_CHAT_SUCCESS:
      const results = state.results.filter((id) => id !== action.result.id);
      return {
        ...state,
        results: results,
      };
    case REMOVE_CHAT_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function openReducer(state, action) {
  switch (action.type) {
    case OPEN_CHAT_FORM:
      return {
        ...state,
        openChatForm: !state.openChatForm,
      };
    case OPEN_CHAT:
      return {
        ...state,
        openChat: !state.openChat,
      };
    default:
      return state;
  }
}

function addMessageReducer(state, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      let messages = [];
      if (state.messages.length > 300) {
        messages = [...state.messages.slice(150, state.messages.length), action.message];
      } else {
        messages = [...state.messages, action.message];
      }
      return {
        ...state,
        messages: messages,
      };
    default:
      return state;
  }
}

function scrollingReducer(state, action) {
  switch (action.type) {
    case SCROLLING_CHAT:
      return {
        ...state,
        scrollChat: action.scrollChat,
      };
    default:
      return state;
  }
}

function savePrefsReducer(state, action) {
  switch (action.type) {
    case SAVE_PREFS:
      return state;
    case SAVE_PREFS_SUCCESS:
      return {
        ...state,
        prefs: action.result,
      };
    case SAVE_PREFS_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function loadPrefsReducer(state, action) {
  switch (action.type) {
    case LOAD_PREFS:
      return state;
    case LOAD_PREFS_SUCCESS:
      return {
        ...state,
        prefs: action.result,
      };
    case LOAD_PREFS_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function prefsReducer(state, action) {
  switch (action.type) {
    case OPEN_PREFS:
      return {
        ...state,
        openPrefs: !state.openPrefs,
      };
    case SAVE_PREFS:
    case SAVE_PREFS_SUCCESS:
    case SAVE_PREFS_FAIL:
      return savePrefsReducer(state, action);
    case LOAD_PREFS:
    case LOAD_PREFS_SUCCESS:
    case LOAD_PREFS_FAIL:
      return loadPrefsReducer(state, action);
    default:
      return state;
  }
}

export default function reducer(state = initialValues, action = {}) {
  switch (action.type) {
    case LOAD_CHATS:
    case LOAD_CHATS_SUCCESS:
    case LOAD_CHATS_FAIL:
      return loadChatsReducer(state, action);
    case ADD_CHAT:
    case ADD_CHAT_SUCCESS:
    case ADD_CHAT_FAIL:
      return addChatReducer(state, action);
    case REMOVE_CHAT:
    case REMOVE_CHAT_SUCCESS:
    case REMOVE_CHAT_FAIL:
      return removeChatReducer(state, action);
    case OPEN_CHAT:
    case OPEN_CHAT_FORM:
      return openReducer(state, action);
    case ADD_MESSAGE:
      return addMessageReducer(state, action);
    case SCROLLING_CHAT:
      return scrollingReducer(state, action);
    case OPEN_PREFS:
    case SAVE_PREFS:
    case SAVE_PREFS_SUCCESS:
    case SAVE_PREFS_FAIL:
    case LOAD_PREFS:
    case LOAD_PREFS_SUCCESS:
    case LOAD_PREFS_FAIL:
      return prefsReducer(state, action);
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.chatsWidget && globalState.chatsWidget.loaded;
}

export function loadChats() {
  return {
    types: [LOAD_CHATS, LOAD_CHATS_SUCCESS, LOAD_CHATS_SUCCESS],
    promise: (client) => client.get('/widgets/chats/')
  };
}

export function addChat(chat) {
  console.log(chat);
  return {
    types: [ADD_CHAT, ADD_CHAT_SUCCESS, ADD_CHAT_FAIL],
    promise: (client) => client.post('/widgets/chats/add', {data: chat})
  };
}

export function removeChat(chat) {
  return {
    types: [REMOVE_CHAT, REMOVE_CHAT_SUCCESS, REMOVE_CHAT_FAIL],
    promise: (client) => client.post('/widgets/chats/remove', {data: chat})
  };
}

export function openingForm() {
  return {
    type: OPEN_CHAT_FORM,
  };
}

export function openingChat() {
  return {
    type: OPEN_CHAT,
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message: message,
  };
}

export function scrollingChat(scrollChat) {
  return {
    type: SCROLLING_CHAT,
    scrollChat: scrollChat,
  };
}

export function openingPrefs() {
  return {
    type: OPEN_PREFS
  };
}

export function loadPrefs() {
  return {
    types: [LOAD_PREFS, LOAD_PREFS_SUCCESS, LOAD_PREFS_FAIL],
    promise: (client) => client.get('/widgets/chats/pref')
  };
}

export function savePrefs(pref) {
  return {
    types: [SAVE_PREFS, SAVE_PREFS_SUCCESS, SAVE_PREFS_FAIL],
    promise: (client) => client.post('/widgets/chats/pref', {data: pref})
  };
}
