const LOAD_IMAGES = 'donategold.me/uploader/LOAD_IMAGES';
const LOAD_IMAGES_SUCCESS = 'donategold.me/uploader/LOAD_IMAGES_SUCCESS';
const LOAD_IMAGES_FAIL = 'donategold.me/uploader/LOAD_IMAGES_FAIL';
const LOAD_SOUNDS = 'donategold.me/uploader/LOAD_SOUNDS';
const LOAD_SOUNDS_SUCCESS = 'donategold.me/uploader/LOAD_SOUNDS_SUCCESS';
const LOAD_SOUNDS_FAIL = 'donategold.me/uploader/LOAD_SOUNDS_FAIL';
const UPLOAD_IMAGE = 'donategold.me/uploader/UPLOAD_IMAGE';
const UPLOAD_IMAGE_SUCCESS = 'donategold.me/uploader/UPLOAD_IMAGE_SUCCESS';
const UPLOAD_IMAGE_FAIL = 'donategold.me/uploader/UPLOAD_IMAGE_FAIL';
const UPLOAD_SOUND = 'donategold.me/uploader/UPLOAD_SOUND';
const UPLOAD_SOUND_SUCCESS = 'donategold.me/uploader/UPLOAD_SOUND_SUCCESS';
const UPLOAD_SOUND_FAIL = 'donategold.me/uploader/UPLOAD_SOUND_FAIL';
const DELETE_IMAGE = 'donategold.me/uploader/DELETE_IMAGE';
const DELETE_IMAGE_SUCCESS = 'donategold.me/uploader/DELETE_IMAGE_SUCCESS';
const DELETE_IMAGE_FAIL = 'donategold.me/uploader/DELETE_IMAGE_FAIL';
const DELETE_SOUND = 'donategold.me/uploader/DELETE_SOUND';
const DELETE_SOUND_SUCCESS = 'donategold.me/uploader/DELETE_SOUND_SUCCESS';
const DELETE_SOUND_FAIL = 'donategold.me/uploader/DELETE_SOUND_FAIL';
const ACTIVING_TAB = 'donategol.me/uploader/ACTIVING_TAB';


const initialState = {
  loading: false,
  load: false,
  images: [],
  sounds: [],
  error: null,
  activeTab: 1,
};

function loadImagesReducer(state, action) {
  switch (action.type) {
    case LOAD_IMAGES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.result,
        loading: false,
        load: true,
      };
    case LOAD_IMAGES_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

function loadSoundsReducer(state, action) {
  switch (action.type) {
    case LOAD_SOUNDS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SOUNDS_SUCCESS:
      return {
        ...state,
        loading: false,
        load: true,
        sounds: action.result,
      };
    case LOAD_SOUNDS_FAIL:
      return {
        ...state,
        loading: false,
        load: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function uploadImageReducer(state, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        uploadingImage: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      const images = [...state.images, action.result];
      return {
        ...state,
        images: images,
        uploadingImage: false,
      };
    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        uploadingImage: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function uploadSoundReducer(state, action) {
  switch (action.type) {
    case UPLOAD_SOUND:
      return {
        ...state,
        uploadingSound: true,
      };
    case UPLOAD_SOUND_SUCCESS:
      const sounds = [...state.sounds, action.result];
      return {
        ...state,
        sounds: sounds,
        uploadingSound: false,
      };
    case UPLOAD_SOUND_FAIL:
      return {
        ...state,
        uploadingSounds: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function deleteImageReducer(state, action) {
  switch (action.type) {
    case DELETE_IMAGE:
      return state;
    case DELETE_IMAGE_SUCCESS:
      const images = state.images.filter((img) => img !== action.result);
      return {
        ...state,
        images: images,
      };
    case DELETE_IMAGE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

function deleteSoundReducer(state, action) {
  switch (action.type) {
    case DELETE_SOUND:
      return state;
    case DELETE_SOUND_SUCCESS:
      const sounds = state.sounds.filter((sound) => sound !== action.result);
      return {
        ...state,
        sounds: sounds,
      };
    case DELETE_SOUND_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_IMAGES:
    case LOAD_IMAGES_SUCCESS:
    case LOAD_IMAGES_FAIL:
      return loadImagesReducer(state, action);
    case LOAD_SOUNDS:
    case LOAD_SOUNDS_SUCCESS:
    case LOAD_SOUNDS_FAIL:
      return loadSoundsReducer(state, action);
    case UPLOAD_IMAGE:
    case UPLOAD_IMAGE_SUCCESS:
    case UPLOAD_IMAGE_FAIL:
      return uploadImageReducer(state, action);
    case UPLOAD_SOUND:
    case UPLOAD_SOUND_SUCCESS:
    case UPLOAD_SOUND_FAIL:
      return uploadSoundReducer(state, action);
    case DELETE_IMAGE:
    case DELETE_IMAGE_SUCCESS:
    case DELETE_IMAGE_FAIL:
      return deleteImageReducer(state, action);
    case DELETE_SOUND:
    case DELETE_SOUND_SUCCESS:
    case DELETE_SOUND_FAIL:
      return deleteSoundReducer(state, action);
    case ACTIVING_TAB:
      return {
        ...state,
        activeTab: action.tab,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  console.log(globalState.uploader && globalState.uploader.load);
  return globalState.uploader && globalState.uploader.load;
}

export function loadImages() {
  return {
    types: [LOAD_IMAGES, LOAD_IMAGES_SUCCESS, LOAD_IMAGES_FAIL],
    promise: (client) => client.get('/upload/img')
  };
}

export function loadSounds() {
  return {
    types: [LOAD_SOUNDS, LOAD_SOUNDS_SUCCESS, LOAD_SOUNDS_FAIL],
    promise: (client) => client.get('/upload/sound')
  };
}

export function uploadImage(id, multipart) {
  console.log(id, multipart);
  return {
    types: [UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAIL],
    promise: (client) => client.post('/upload/img', {}, multipart)
  };
}

export function uploadSound(id, multipart) {
  console.log(id, multipart);
  return {
    types: [UPLOAD_SOUND, UPLOAD_SOUND_SUCCESS, UPLOAD_SOUND_FAIL],
    promise: (client) => client.post('/upload/sound', {}, multipart)
  };
}

export function deleteImage(img) {
  console.log(img);
  return {
    types: [DELETE_IMAGE, DELETE_IMAGE_SUCCESS, DELETE_IMAGE_FAIL],
    promise: (client) => client.del('/upload/img', {params: {file: img}})
  };
}

export function deleteSound(sound) {
  return {
    types: [DELETE_SOUND, DELETE_SOUND_SUCCESS, DELETE_SOUND_FAIL],
    promise: (client) => client.del('/upload/sound', {params: {file: sound}})
  };
}

export function activingTab(tab) {
  return {
    type: ACTIVING_TAB,
    tab: tab,
  };
}
