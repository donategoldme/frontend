import {normalize} from 'normalizr';
import {paypageSchema} from 'schema/standardWidget';

const LOAD_PAYPAGES = 'donategold.me/widgets/standard/paypage/LOAD_PAYPAGES';
const LOAD_PAYPAGES_SUCCESS = 'donategold.me/widgets/standard/paypage/LOAD_PAYPAGES_SUCCESS';
const LOAD_PAYPAGES_FAIL = 'donategold.me/widgets/standard/paypage/LOAD_PAYPAGES_FAIL';

const SAVE_PAYPAGE = 'donategold.me/widgets/standard/paypage/SAVE_PAYPAGE';
const SAVE_PAYPAGE_SUCCESS = 'donategold.me/widgets/standard/paypage/SAVE_PAYPAGE_SUCCESS';
const SAVE_PAYPAGE_FAIL = 'donategold.me/widgets/standard/paypage/SAVE_PAYPAGE_FAIL';

const DELETE_PAYPAGE = 'donategold.me/widgets/standard/paypage/DELETE_PAYPAGE';
const DELETE_PAYPAGE_SUCCESS = 'donategold.me/widgets/standard/paypage/DELETE_PAYPAGE_SUCCESS';
const DELETE_PAYPAGE_FAIL = 'donategold.me/widgets/standard/paypage/DELETE_PAYPAGE_FAIL';

const EDIT_PAYPAGE = 'donategold.me/widgets/standard/paypage/EDIT_PAYPAGE';

// const ACTIVATE_PAYPAGE = 'donategold.me/widgets/standard/paypage/ACTIVATE_PAYPAGE';
// const ACTIVATE_PAYPAGE_SUCCESS = 'donategold.me/widgets/standard/paypage/ACTIVATE_PAYPAGE_SUCCESS';
// const ACTIVATE_PAYPAGE_FAIL = 'donategold.me/widgets/standard/paypage/ACTIVATE_PAYPAGE_FAIL';

const UPLOADER_FORM = 'donategold.me/widgets/standard/paypage/UPLOADER_OPEN';
const OPEN_FORM = 'donategold.me/widgets/standard/paypage/OPEN_FORM';

const initialState = {
  openForm: false,
  loading: false,
  loaded: false,
  error: '',
  paypages: {},
  results: [],
  uploaderForm: false,
};

function loadReducer(state, action) {
  switch (action.type) {
    case LOAD_PAYPAGES:
      return {
        ...state,
        error: '',
      };
    case LOAD_PAYPAGES_SUCCESS:
      const data = normalize(action.result, [paypageSchema]);
      return {
        ...state,
        paypages: data.entities.paypage || {},
        results: data.result,
        error: '',
      };
    case LOAD_PAYPAGES_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function savePaypageReducer(state, action) {
  switch (action.type) {
    case SAVE_PAYPAGE:
      return {
        ...state,
        loading: true
      };
    case SAVE_PAYPAGE_SUCCESS:
      const paypages = {...state.paypages};
      paypages[action.result.id] = action.result;
      const results = state.results.indexOf(action.result.id) === -1 ? [...state.results, action.result.id] : [...state.results];
      return {
        ...state,
        paypages: paypages,
        results: results,
        loading: false,
        loaded: true,
      };
    case SAVE_PAYPAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function deleteReducer(state, action) {
  switch (action.type) {
    case DELETE_PAYPAGE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PAYPAGE_SUCCESS:
      const paypages = state.paypages.result.filter((id) => id !== action.result.id);
      return {
        ...state,
        paypages: paypages,
        loading: false,
      };
    case DELETE_PAYPAGE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

function openFormReducer(state, action) {
  switch (action.type) {
    case OPEN_FORM:
      return {
        ...state,
        openForm: !state.openForm,
      };
    default:
      return state;
  }
}

function editPaypageReducer(state, action) {
  switch (action.type) {
    case EDIT_PAYPAGE:
      const paypages = {...state.paypages};
      paypages[action.id].edit = !paypages[action.id].edit;
      return {
        ...state,
        paypages: paypages,
      };
    default:
      return state;
  }
}

function uploaderReducer(state, action) {
  switch (action.type) {
    case UPLOADER_FORM:
      return {
        ...state,
        uploaderForm: !state.uploaderForm,
      };
    default:
      return state;
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PAYPAGES:
    case LOAD_PAYPAGES_SUCCESS:
    case LOAD_PAYPAGES_FAIL:
      return loadReducer(state, action);
    case SAVE_PAYPAGE:
    case SAVE_PAYPAGE_SUCCESS:
    case SAVE_PAYPAGE_FAIL:
      return savePaypageReducer(state, action);
    case DELETE_PAYPAGE:
    case DELETE_PAYPAGE_SUCCESS:
    case DELETE_PAYPAGE_FAIL:
      return deleteReducer(state, action);
    case OPEN_FORM:
      return openFormReducer(state, action);
    case EDIT_PAYPAGE:
      return editPaypageReducer(state, action);
    case UPLOADER_FORM:
      return uploaderReducer(state, action);
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.standardWidget.paypage && globalState.standardWidget.paypage.loaded;
}

export function loadPaypages() {
  return {
    types: [LOAD_PAYPAGES, LOAD_PAYPAGES_SUCCESS, LOAD_PAYPAGES_FAIL],
    promise: (client) => client.get('/widgets/standard/paypage'),
  };
}

export function uploaderFormMng() {
  return {
    type: UPLOADER_FORM,
  };
}

export function savePaypage(paypage) {
  let url = '/widgets/standard/paypage/';
  if (paypage.id !== undefined && paypage.id > 0) {
    url += paypage.id;
  }
  return {
    types: [SAVE_PAYPAGE, SAVE_PAYPAGE_SUCCESS, SAVE_PAYPAGE_FAIL],
    promise: (client) => client.post(url, {data: paypage})
  };
}

export function editPaypage(id) {
  return {
    type: EDIT_PAYPAGE,
    id: id,
  };
}

export function openFormMng() {
  return {
    type: OPEN_FORM,
  };
}
