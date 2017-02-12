// import {normalize} from 'normalizr';
// import youtubeSchema from 'redux/schema/widgets/youtube';

const LOAD = 'donategold.me/widgets/youtubeWF/LOAD';
const LOAD_SUCCESS = 'donategold.me/widgets/youtubeWF/LOAD_SUCCESS';
const LOAD_FAIL = 'donategold.me/widgets/youtubeWF/LOAD_FAIL';
const EDIT_START = 'donategold.me/widgets/youtubeWF/EDIT_START';
const EDIT_STOP = 'donategold.me/widgets/youtubeWF/EDIT_STOP';
const SAVE = 'donategold.me/widgets/youtubeWF/SAVE';
const SAVE_SUCCESS = 'donategold.me/widgets/youtubeWF/SAVE_SUCCESS';
const SAVE_FAIL = 'donategold.me/widgets/youtubeWF/SAVE_FAIL';
const DELETE = 'donategold.me/widgets/youtubeWF/DELETE';
const DELETE_SUCCESS = 'donategold.me/widgets/youtubeWF/DELETE_SUCCESS';
const DELETE_FAIL = 'donategold.me/widgets/youtubeWF/DELETE_FAIL';
const ACTIVE = 'donategold.me/widgets/youtubeWF/ACTIVE';
const ACTIVE_SUCCESS = 'donategold.me/widgets/youtubeWF/ACTIVE_SUCCESS';
const ACTIVE_FAIL = 'donategold.me/widgets/youtubeWF/ACTIVE_FAIL';
const OPEN = 'donategold.me/widgets/youtubeWF/OPEN';
const ADD_VIDEO_DIALOG = 'donategold.me/widgets/youtubeWF/ADD_VIDEO_DIALOG';
const ADD_VIDEO = 'donategold.me/widgets/youtubeWF/ADD_VIDEO';
const ADD_VIDEO_SUCCESS = 'donategold.me/widgets/youtubeWF/ADD_VIDEO_SUCCESS';
const ADD_VIDEO_FAIL = 'donategold.me/widgets/youtubeWF/ADD_VIDEO_FAIL';
const VIEWED_VIDEO = 'donategold.me/widgets/youtubeWF/VIEWED_VIDEO';
const VIEWED_VIDEO_SUCCESS = 'donategold.me/widgets/youtubeWF/VIEWED_VIDEO_SUCCESS';
const VIEWED_VIDEO_FAIL = 'donategold.me/widgets/youtubeWF/VIEWED_VIDEO_FAIL';

const initialState = {
  loaded: false,
  saveError: {},
  editing: 0,
  deleting: 0,
  activing: 0,
  dialog: false,
  addVideoDialogOpen: false,
  error: null,
};

function loadReducer(state, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      // console.log(normalize(action.result, youtubeSchema));
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

function editReducer(state, action) {
  switch (action.type) {
    case EDIT_START:
      return {
        ...state,
        editing: action.id,
        dialog: true,
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: 0,
        dialog: false,
      };
    default:
      return state;
  }
}

function saveReducer( state, action) {
  switch (action.type) {
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      let data = [...state.data];
      let toPush = true;
      data = data.map((obj) => {
        if (obj.id === action.result.id) {
          action.result.videos = obj.videos;
          toPush = false;
          return action.result;
        }
        return obj;
      });
      if (toPush) {
        data.push(action.result);
      }
      return {
        ...state,
        data: data,
        editing: 0,
        saveError: {
          ...state.saveError,
          [action.id]: null
        },
        dialog: false,
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        },
        dialog: false,
      } : state;
    default:
      return state;
  }
}

function deleteReducer(state, action) {
  switch (action.type) {
    case DELETE:
      return {
        ...state,
        deleting: action.id
      };
    case DELETE_SUCCESS:
      const dataFiltered = state.data.filter((obj) => obj.id !== action.id);
      return {
        ...state,
        data: dataFiltered,
        deleting: 0,
      };
    case DELETE_FAIL:
      return {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      };
    default:
      return state;
  }
}

function activeReducer(state, action) {
  switch (action.type) {
    case ACTIVE:
      return {
        ...state,
        activing: action.id
      };
    case ACTIVE_SUCCESS:
      let activatings = [...state.data];
      activatings = activatings.map((obj) => {
        if (obj.id === action.result) {
          obj.active = true;
        } else {
          obj.active = false;
        }
        return obj;
      });
      return {
        ...state,
        data: activatings,
        activing: 0,
      };
    case ACTIVE_FAIL:
      return {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      };
    default:
      return state;
  }
}

function addVideoDialogReducer(state, action) {
  switch (action.type) {
    case ADD_VIDEO_DIALOG:
      let openings = [...state.data];
      openings = openings.map((obj) => {
        if (obj.id === +action.id) {
          obj.addVideoOpen = !obj.addVideoOpen;
        }
        return obj;
      });
      return {
        ...state,
        data: openings,
        activing: 0,
      };
    default:
      return state;
  }
}

function addVideoReducer(state, action) {
  switch (action.type) {
    case ADD_VIDEO:
      return state;
    case ADD_VIDEO_SUCCESS:
      let data = [...state.data];
      data = data.map((obj) => {
        if (obj.id === action.result.youtube_id) {
          obj.videos.push(action.result);
        }
        return obj;
      });
      return {
        ...state,
        data: data,
      };
    case ADD_VIDEO_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function viewdVideoReducer(state, action) {
  switch (action.type) {
    case VIEWED_VIDEO:
      return state;
    case VIEWED_VIDEO_SUCCESS:
      let data = [...state.data];
      data = data.map((obj) => {
        if (obj.id === action.result.youtube_id) {
          obj.videos = obj.videos.filter((video) => video.id !== action.result.id);
        }
        return obj;
      });
      return {
        ...state,
        data: data,
      };
    case VIEWED_VIDEO_FAIL:
      return {
        ...state,
        saveError: {
          ...state.saveError,
          [action.result.youtube_id]: action.error
        }
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
    case EDIT_START:
    case EDIT_STOP:
      return editReducer(state, action);
    case SAVE:
    case SAVE_SUCCESS:
    case SAVE_FAIL:
      return saveReducer(state, action);
    case DELETE:
    case DELETE_SUCCESS:
    case DELETE_FAIL:
      return deleteReducer(state, action);
    case ACTIVE:
    case ACTIVE_SUCCESS:
    case ACTIVE_FAIL:
      return activeReducer(state, action);
    case OPEN:
      let openings = [...state.data];
      openings = openings.map((obj) => {
        if (obj.id === action.id) {
          obj.opened = !obj.opened;
        }
        return obj;
      });
      return {
        ...state,
        data: openings,
        activing: 0,
      };
    case ADD_VIDEO_DIALOG:
      return addVideoDialogReducer(state, action);
    case ADD_VIDEO:
    case ADD_VIDEO_SUCCESS:
    case ADD_VIDEO_FAIL:
      return addVideoReducer(state, action);
    case VIEWED_VIDEO:
    case VIEWED_VIDEO_SUCCESS:
    case VIEWED_VIDEO_FAIL:
      return viewdVideoReducer(state, action);
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.youtubeWidget && globalState.youtubeWidget.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widgets/youtube/') // params not used, just shown as demonstration
  };
}

export function save(widget) {
  widget.cost = +widget.cost;
  widget.likes = +widget.likes;
  widget.views = +widget.views;
  widget.duration = +widget.duration;
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/widgets/youtube/', {
      data: widget
    })
  };
}

export function deleteWidget(id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id: id,
    promise: (client) => client.del('/widgets/youtube/' + id, {data: id})
  };
}

export function activeWidget(id) {
  return {
    types: [ACTIVE, ACTIVE_SUCCESS, ACTIVE_FAIL],
    id: id,
    promise: (client) => client.post('/widgets/youtube/' + id, {data: id})
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}

export function openWidget(id) {
  return {type: OPEN, id};
}

export function addVideoDialog(id) {
  return {type: ADD_VIDEO_DIALOG, id};
}

export function addVideo(id, url) {
  return {
    types: [ADD_VIDEO, ADD_VIDEO, ADD_VIDEO_FAIL],
    promise: (client) => client.post('/widgets/youtube/' + id + '/addVideo', {data: {url: url}})
  };
}

export function addVideoSuccess(video) {
  return {
    type: ADD_VIDEO_SUCCESS,
    result: video,
  };
}

export function viewedVideo(video) {
  return {
    types: [VIEWED_VIDEO, VIEWED_VIDEO, VIEWED_VIDEO_FAIL],
    promise: (client) => client.post('/widgets/youtube/' + video.youtube_id + '/viewedDone', {data: video})
  };
}

export function viewedVideoSuccess(video) {
  return {
    type: VIEWED_VIDEO_SUCCESS,
    result: video,
  };
}
