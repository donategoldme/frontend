import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import {isLoadedPrefs, loadPrefs, savePrefs as save} from 'redux/modules/widgets/chats/chats';
import { ChatsPrefWF } from 'components/Forms/ChatsWF/ChatsPrefWF';


@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoadedPrefs(getState())) {
      promises.push(dispatch(loadPrefs()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    user: state.auth.user,
    prefs: state.chatsWidget.prefs,
  }),
  {savePrefs: save})
export default class ChatPrefs extends PureComponent {
  static propTypes = {
    prefs: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    savePrefs: PropTypes.func.isRequired,
  };

  render() {
    const {prefs, savePrefs} = this.props;
    return (
      <div>
        Prefs of chat
        <ChatsPrefWF key={String(prefs.id)} widget={prefs} saveWidget={savePrefs}/>
      </div>
    );
  }
}
