import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { pagination } from 'violet-paginator';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import balance from './balance';
import centrifugo from './centrifugo';
import youtubeWidget from './widgets/youtube';
import standardWidget from './widgets/standard';
import chatsWidget from './widgets/chats/reducer';
import uploader from './uploader';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  pagination,
  balance,
  centrifugo,
  youtubeWidget,
  standardWidget,
  uploader,
  chatsWidget,
});
