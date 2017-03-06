import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Row, Button, Well, Col} from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';
import 'rc-slider/assets/index.css';

import * as widgetActions from 'redux/modules/widgets/chats';
import {subscribe} from 'redux/modules/centrifugo';
import {isLoaded, loadChats as loadWidgets} from 'redux/modules/widgets/chats';
import ChatsAddForm from 'components/Forms/ChatsWF/ChatsAddForm';
import {ChatNew} from './Chat';


@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(loadWidgets()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    entities: state.chatsWidget.entities,
    results: state.chatsWidget.results,
    error: state.chatsWidget.error,
    user: state.auth.user,
    openChat: state.chatsWidget.openChat,
    openChatForm: state.chatsWidget.openChatForm,
    cgo: state.centrifugo,
  }),
  {...widgetActions, subscribe})
export default class ChatsWidget extends Component {
  static propTypes = {
    entities: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
    error: PropTypes.any,
    addChat: PropTypes.func.isRequired,
    removeChat: PropTypes.func.isRequired,
    openChat: PropTypes.bool.isRequired,
    openChatForm: PropTypes.bool.isRequired,
    openingForm: PropTypes.func.isRequired,
    openingChat: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    cgo: PropTypes.object.isRequired,
  };

  render() {
    console.log('render');
    const {error, entities, results, user, removeChat, openingForm, openingChat,
    openChat, openChatForm} = this.props;
    let widgetScreen = '';
    if (__CLIENT__) {
      widgetScreen = 'http://' + document.location.hostname + '/screen/chatsWidget?t=' + user.token;
    }
    // const styles = require('./chats.scss');
    const handleDelete = (chat) => {
      return () => {
        if (confirm('Вы действительно хотите удалить виджет?')) {
          return removeChat(chat);
        }
      };
    };
    const handleOpenChat = () => {
      openingChat();
    };
    return (
          <div>
            <Helmet title={'Donates'}/>
            <Row>
              <h1>
                Виджет чатов
              </h1>
              <Helmet title="Youtube Widgets"/>
              <div>
                <p>Виджет для присоединёных чатов</p>
                {
                  __CLIENT__ &&
                    <div>
                      <input readOnly value={widgetScreen} />
                      <Link to={widgetScreen} target="_blank">
                        <Button>Открыть</Button>
                      </Link>
                      <CopyToClipboard text={widgetScreen}>
                      <Button>Скопировать</Button>
                      </CopyToClipboard>
                    </div>
                }
              </div>
              {error &&
                <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                {' '}
                {JSON.stringify(error)}
              </div>}
              <Button onClick={openingForm}>Присоединить новый чат</Button>
              <Button onClick={handleOpenChat}>{openChat ? 'Закрыть чат' : 'Открыть чат' }</Button>
              {openChatForm && <ChatsAddForm/>}
              {openChat && <Col xs={12} md={12}>
                <ChatNew/>
              </Col>
              }
            </Row>
            <Row>
              {
                results.map((id) =>
                <Well key={id}>
                {entities[id].slug}
                <Button onClick={handleDelete(entities[id])}>Удалить</Button>
                </Well>
                )
              }
            </Row>
          </div>
    );
  }
}
