import Centrifuge from 'centrifuge';
import config from '../config';
import {
  refreshBalance
} from 'redux/modules/balance';
import {addVideoSuccess, viewedVideoSuccess} from 'redux/modules/widgets/youtube';
import {saveWidgetWS as saveStandardWidget} from 'redux/modules/widgets/standard';

function switcher(dispatch, data) {
  console.log(data);
  switch (data.type) {
    case 'add_to_balance':
      dispatch(refreshBalance(data.money));
      break;
    case 'add_youtube_video':
      dispatch(addVideoSuccess(data.video));
      break;
    case 'youtube_video_viewed':
      dispatch(viewedVideoSuccess(data.video));
      break;
    case 'standard_prefs_save':
      dispatch(saveStandardWidget(data.standard));
      break;
    default:
      break;
  }
}

export default function getClient(userId, username, timestamp, token) {
  return (dispatch) => {
    const cgo = new Centrifuge({
      url: 'http://' + config.apiHost + ':8000',
      user: `${userId}`,
      timestamp: timestamp,
      info: '',
      token: token,
      authEndpoint: '/api/auth/centrifugo'
    });
    cgo.subscribe(`$${userId}`, (res) => switcher(dispatch, res.data));
    cgo.connect();
  };
}
