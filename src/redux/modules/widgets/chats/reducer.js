import * as chats from './chats';
import * as polls from './polls/polls';
import * as actions from './polls/actions';

const initialValues = {
  loaded: false,
  scrollChat: true,
  openChatForm: false,
  prefs: {},
  results: [],
  entities: {},
  messages: [],
  poll: {},
  pollAdd: false,
  error: '',
};

export default function reducer(state = initialValues, action = {}) {
  switch (action.type) {
    case chats.LOAD_CHATS:
    case chats.LOAD_CHATS_SUCCESS:
    case chats.LOAD_CHATS_FAIL:
    case chats.ADD_CHAT:
    case chats.ADD_CHAT_SUCCESS:
    case chats.ADD_CHAT_FAIL:
    case chats.REMOVE_CHAT:
    case chats.REMOVE_CHAT_SUCCESS:
    case chats.REMOVE_CHAT_FAIL:
    case chats.OPEN_CHAT_FORM:
    case chats.ADD_MESSAGE:
    case chats.SCROLLING_CHAT:
    case chats.SAVE_PREFS:
    case chats.SAVE_PREFS_SUCCESS:
    case chats.SAVE_PREFS_FAIL:
    case chats.LOAD_PREFS:
    case chats.LOAD_PREFS_SUCCESS:
    case chats.LOAD_PREFS_FAIL:
      return chats.reducer(state, action);
    case actions.GET_POLL:
    case actions.GET_POLL_SUCCESS:
    case actions.GET_POLL_FAIL:
    case actions.SAVE_POLL:
    case actions.SAVE_POLL_SUCCESS:
    case actions.SAVE_POLL_FAIL:
    case actions.DELETE_POLL:
    case actions.DELETE_POLL_SUCCESS:
    case actions.DELETE_POLL_FAIL:
    case actions.POLL_ADD:
      return polls.reducer(state, action);
    default:
      return state;
  }
}
