import { combineReducers } from 'redux';

import paypagesReducer from './paypage';
import prefsReducer from './prefs';

export default combineReducers({
  paypages: paypagesReducer,
  prefs: prefsReducer,
});
