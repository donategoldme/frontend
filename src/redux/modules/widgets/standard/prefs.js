import {normalize} from 'normalizr';
import {standardWidget, standardDonate} from 'schema/standardWidget';

const LOAD = 'donategold.me/widgets/standard/LOAD';
const LOAD_SUCCESS = 'donategold.me/widgets/standard/LOAD_SUCCESS';
const LOAD_FAIL = 'donategold.me/widgets/standard/LOAD_FAIL';
const EDIT_WIDGET = 'donategold.me/widgets/standard/EDIT_WIDGET';
const DIALOG_OPEN = 'donategold.me/widgets/standard/DIALOG_OPEN';
const OPEN_WIDGET = 'donategold.me/widgets/standard/OPEN_WIDGET';
const CREATE = 'donategold.me/widgets/standard/CREATE';
const CREATE_SUCCESS = 'donategold.me/widgets/standard/CREATE_SUCCESS';
const CREATE_FAIL = 'donategold.me/widgets/standard/CREATE_FAIL';
const SAVE = 'donategold.me/widgets/standard/SAVE';
const SAVE_SUCCESS = 'donategold.me/widgets/standard/SAVE_SUCCESS';
const SAVE_FAIL = 'donategold.me/widgets/standard/SAVE_FAIL';
const DELETE = 'donategold.me/widgets/standard/DELETE';
const DELETE_SUCCESS = 'donategold.me/widgets/standard/DELETE_SUCCESS';
const DELETE_FAIL = 'donategold.me/widgets/standard/DELETE_FAIL';
const EDIT_IMAGE = 'donategold.me/widgets/standard/EDIT_IMAGE';
const EDIT_SOUND = 'donategold.me/widgets/standard/EDIT_SOUND';
const LOAD_DONATES = 'donategold.me/widgets/standard/LOAD_DONATES';
const LOAD_DONATES_SUCCESS = 'donategold.me/widgets/standard/LOAD_DONATES_SUCCESS';
const LOAD_DONATES_FAIL = 'donategold.me/widgets/standard/LOAD_DONATES_FAIL';
const ADD_DONATE = 'donategold.me/widgets/standard/ADD_DONATE';
const ADD_DONATE_SUCCESS = 'donategold.me/widgets/standard/ADD_DONATE_SUCCESS';
const ADD_DONATE_FAIL = 'donategold.me/widgets/standard/ADD_DONATE_FAIL';
const ADD_DONATE_FORM = 'donategold.me/widgets/standard/ADD_DONATE_FORM';
const FAIL = 'donategold.me/widgets/standard/FAIL';
const VIEWED_DONATE_SUCCESS = 'donategold.me/widgets/standard/VIEWED_DONATE_SUCCESS';
const OPEN_LIST_OF_DONATES = 'donategold.me/widgets/standard/OPEN_LIST_OF_DONATES';

const initialState = {
  loading: false,
  loaded: false,
  widgets: {},
  results: [],
  donates: {results: [], entities: {}, loaded: false},
  error: null,
  dialog: false,
  addDonateForm: false,
  listOfDonates: false,
};

function loadReducer(state, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      const data = normalize(action.result, [standardWidget]);
      return {
        ...state,
        loaded: true,
        widgets: data.entities.standard || {},
        results: data.result || [],
      };
    case LOAD_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function dialogReducer(state, action) {
  switch (action.type) {
    case DIALOG_OPEN:
      return {
        ...state,
        dialog: !state.dialog,
      };
    // case DIALOG_CLOSE:
      // return {
      //   ...state,
      //   dialog: false,
      // };
    default:
      return state;
  }
}

function createReducer(state, action) {
  switch (action.type) {
    case CREATE:
      return state;
    case CREATE_SUCCESS:
      action.result.opened = true;
      const results = [action.result.id, ...state.results];
      const widgets = {...state.widgets};
      widgets[action.result.id] = action.result;
      return {
        ...state,
        results: results,
        widgets: widgets,
      };
    case CREATE_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

function saveReducer(state, action) {
  switch (action.type) {
    case SAVE:
      return state;
    case SAVE_SUCCESS:
      const data = {...state.widgets};
      if (action.result.active) {
        state.results.forEach((id) => data[id].active = false);
      }
      data[action.result.id] = action.result;
      const results = state.results.indexOf(action.result.id) === -1 ? [...state.results, action.result.id] : [...state.results];
      return {
        ...state,
        widgets: data,
        results: results,
      };
    case SAVE_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

function deleteReducer(state, action) {
  switch (action.type) {
    case DELETE:
      return state;
    case DELETE_SUCCESS:
      const results = state.results.filter((widget) => widget !== action.result);
      return {
        ...state,
        results: results,
      };
    case DELETE_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

// function editFieldReducer(state, action) {
//   switch (action.type) {
//     case EDIT_FIELD:
//       return {
//         ...state
//       };
//     default:
//       return state;
//   }
// }

function editFileReducer(state, action) {
  switch (action.type) {
    case EDIT_IMAGE:
      const widgets = {...state.widgets};
      widgets[action.id].pic = action.pic;
      return {
        ...state,
        widgets: widgets
      };
    case EDIT_SOUND:
      const widgs = {...state.widgets};
      widgs[action.id].sound = action.sound;
      return {
        ...state,
        widgets: widgs
      };
    default:
      return state;
  }
}

function loadDonatesReducer(state, action) {
  switch (action.type) {
    case LOAD_DONATES:
      return state;
    case LOAD_DONATES_SUCCESS:
      const donates = normalize(action.result, [standardDonate]);
      return {
        ...state,
        donates: {
          results: donates.result,
          entities: donates.entities.standardDonate || {},
          loaded: true,
        }
      };
    case LOAD_DONATES_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

function addDonateReducer(state, action) {
  switch (action.type) {
    case ADD_DONATE:
      return state;
    case ADD_DONATE_SUCCESS:
      const results = state.donates.results.filter((id) => id !== action.result.id);
      results.push(action.result.id);
      const entities = {...state.donates.entities};
      entities[action.result.id] = action.result;
      return {
        ...state,
        donates: {
          results: results,
          entities: entities,
        }
      };
    case ADD_DONATE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function viewedDonateReducer(state, action) {
  switch (action.type) {
    case VIEWED_DONATE_SUCCESS:
      const results = state.donates.results.filter((id) => id !== action.result.id);
      return {
        ...state,
        donates: {
          entities: {...state.donates.entities},
          results: results,
        }
      };
    default:
      return state;
  }
}

function openListOfDonatesReducer(state, action) {
  switch (action.type) {
    case OPEN_LIST_OF_DONATES:
      return {
        ...state,
        listOfDonates: !state.listOfDonates,
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
    case DIALOG_OPEN:
    // case DIALOG_CLOSE:
      return dialogReducer(state, action);
    case CREATE:
    case CREATE_SUCCESS:
    case CREATE_FAIL:
      return createReducer(state, action);
    case SAVE:
    case SAVE_SUCCESS:
    case SAVE_FAIL:
      return saveReducer(state, action);
    case DELETE:
    case DELETE_SUCCESS:
    case DELETE_FAIL:
      return deleteReducer(state, action);
    case EDIT_IMAGE:
    case EDIT_SOUND:
      return editFileReducer(state, action);
    case LOAD_DONATES:
    case LOAD_DONATES_SUCCESS:
    case LOAD_DONATES_FAIL:
      return loadDonatesReducer(state, action);
    case ADD_DONATE:
    case ADD_DONATE_SUCCESS:
    case ADD_DONATE_FAIL:
      return addDonateReducer(state, action);
    case VIEWED_DONATE_SUCCESS:
      return viewedDonateReducer(state, action);
    case OPEN_LIST_OF_DONATES:
      return openListOfDonatesReducer(state, action);
    case OPEN_WIDGET:
      const data = {...state.widgets};
      data[action.id].opened = !data[action.id].opened;
      return {
        ...state,
        widgets: data
      };
    case ADD_DONATE_FORM:
      return {
        ...state,
        addDonateForm: !state.addDonateForm,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.standardWidget.prefs && globalState.standardWidget.prefs.loaded;
}

export function isLoadedDonates(globalState) {
  return globalState.standardWidget.donates && globalState.standardWidget.donates.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widgets/standard/')
  };
}

export function editWidget(widget) {
  return {
    type: EDIT_WIDGET,
    widget: widget,
  };
}

export function dialogOpen() {
  return {
    type: DIALOG_OPEN
  };
}

export function createNew() {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/widgets/standard/')
  };
}

export function saveWidget(widget) {
  return {
    types: [SAVE, SAVE, SAVE_FAIL],
    promise: (client) => client.post(`/widgets/standard/widget/${widget.id}`, {data: widget})
  };
}

export function saveWidgetWS(widget) {
  return {
    type: SAVE_SUCCESS,
    result: widget
  };
}

export function deleteWidget(id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.del('/widgets/standard/widget/' + id)
  };
}

export function openWidget(id) {
  return {
    type: OPEN_WIDGET,
    id: id,
  };
}

// export function editStart(field) {
//   return {
//     type: EDIT_FIELD,
//     field: field,
//   };
// }

export function editImage(id, pic) {
  console.log(id, pic);
  return {
    type: EDIT_IMAGE,
    id: id,
    pic: pic,
  };
}

export function editSound(id, sound) {
  console.log(id, sound);
  return {
    type: EDIT_SOUND,
    id: id,
    sound: sound,
  };
}

export function loadDonates() {
  return {
    types: [LOAD_DONATES, LOAD_DONATES_SUCCESS, LOAD_DONATES_FAIL],
    promise: (client) => client.get('/widgets/standard/donates')
  };
}

export function addDonate(values) {
  values.money = +values.money;
  return {
    types: [ADD_DONATE, '', ADD_DONATE_FAIL],
    promise: (client) => client.post('/widgets/standard/donates', {data: values})
  };
}

export function addDonateWS(values) {
  return {
    type: ADD_DONATE_SUCCESS,
    result: values,
  };
}

export function viewedDonate(id) {
  return {
    types: ['', '', FAIL],
    promise: (client) => client.post('/widgets/standard/donates/' + id)
  };
}

export function viewedDonateWS(donate) {
  return {
    type: VIEWED_DONATE_SUCCESS,
    result: donate,
  };
}

export function openAddDonateForm() {
  console.log('open');
  return {
    type: ADD_DONATE_FORM
  };
}

export function openListOfDonates() {
  return {
    type: OPEN_LIST_OF_DONATES,
  };
}
