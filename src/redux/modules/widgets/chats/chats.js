import {
  normalize
} from 'normalizr';
import {
  chatsWidget
} from 'schema/chatsWidget';

export const LOAD_CHATS = 'donategold.me/chats/LOAD_CHATS';
export const LOAD_CHATS_SUCCESS = 'donategold.me/chats/LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_FAIL = 'donategold.me/chats/LOAD_CHATS_FAIL';
export const ADD_CHAT = 'donategold.me/chats/ADD_CHAT';
export const ADD_CHAT_SUCCESS = 'donategold.me/chats/ADD_CHAT_SUCCESS';
export const ADD_CHAT_FAIL = 'donategold.me/chats/ADD_CHAT_FAIL';
export const REMOVE_CHAT = 'donategold.me/chats/REMOVE_CHAT';
export const REMOVE_CHAT_SUCCESS = 'donategold.me/chats/REMOVE_CHAT_SUCCESS';
export const REMOVE_CHAT_FAIL = 'donategold.me/chats/REMOVE_CHAT_FAIL';
export const OPEN_CHAT_FORM = 'donategold.me/chats/OPEN_CHAT_FORM';
export const ADD_MESSAGE = 'donategold.me/chats/ADD_MESSAGE';
export const SCROLLING_CHAT = 'donategold.me/chats/SCROLLING_CHAT';
export const LOAD_PREFS = 'donategold.me/chats/LOAD_PREFS';
export const LOAD_PREFS_SUCCESS = 'donategold.me/chats/LOAD_PREFS_SUCCESS';
export const LOAD_PREFS_FAIL = 'donategold.me/chats/LOAD_PREFS_FAIL';
export const SAVE_PREFS = 'donategold.me/chats/SAVE_PREFS';
export const SAVE_PREFS_SUCCESS = 'donategold.me/chats/SAVE_PREFS_SUCCESS';
export const SAVE_PREFS_FAIL = 'donategold.me/chats/SAVE_PREFS_FAIL';


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

export function reducer(state, action) {
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
    case OPEN_CHAT_FORM:
      return openReducer(state, action);
    case ADD_MESSAGE:
      return addMessageReducer(state, action);
    case SCROLLING_CHAT:
      return scrollingReducer(state, action);
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

export function isLoadedPrefs(globalState) {
  return globalState.chatsWidget && globalState.chatsWidget.prefs === {};
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
    promise: (client) => client.post('/widgets/chats/conn/add', {data: chat})
  };
}

export function removeChat(chat) {
  return {
    types: [REMOVE_CHAT, REMOVE_CHAT_SUCCESS, REMOVE_CHAT_FAIL],
    promise: (client) => client.post('/widgets/chats/conn/remove', {data: chat})
  };
}

export function openingForm() {
  return {
    type: OPEN_CHAT_FORM,
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
