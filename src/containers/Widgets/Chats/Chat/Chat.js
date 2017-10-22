import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-async-connect';
import { Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import cn from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import SendMessageForm from 'components/Forms/ChatsWF/SendMessageForm';
import { isLoaded, loadChats as loadWidgets } from 'redux/modules/widgets/chats/chats';
import {
  addMessage, scrollingChat, deleteMessage, hideMessage as hm, banUser,
  sendMessageFunc
} from 'redux/modules/widgets/chats/chats';
import { subscribe } from 'redux/modules/centrifugo';
import { RenderMessage } from './Message';
import { getProviderUID } from './utils';
const styles = require('./chats.scss');

function switcher(addToChat, deleteMes) {
  return (res) => {
    switch (res.data.type) {
      case 'new_message':
        addToChat(res.data.message);
        break;
      case 'clear_message':
        deleteMes(res.data.message);
        break;
      default:
        break;
    }
  };
}

function getChats(chatsRes, chatsEnt) {
  const chats = [];
  chatsRes.forEach((id) => {
    chats.push(chatsEnt[id]);
  });
  return chats;
}

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(loadWidgets()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    messages: state.chatsWidget.messages,
    scrollChat: state.chatsWidget.scrollChat,
    user: state.auth.user,
    providers: state.auth.providers,
    chatsEnt: state.chatsWidget.entities,
    chatsRes: state.chatsWidget.results,
    error: state.chatsWidget.error,
  }),
  {
    addMessage, deleteMessage, subscribe, scrollingChat, hideMessage: hm,
    banUser, sendMessageFunc
  })
export default class ChatWidget extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    providers: PropTypes.array.isRequired,
    chatsRes: PropTypes.array.isRequired,
    chatsEnt: PropTypes.object.isRequired,
    scrollChat: PropTypes.bool.isRequired,
    subscribe: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    hideMessage: PropTypes.func.isRequired,
    scrollingChat: PropTypes.func.isRequired,
    sendMessageFunc: PropTypes.func.isRequired,
    banUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentWillMount() {
    if (__CLIENT__) {
      this.props.subscribe(`$${this.props.user.id}/chats`, switcher(this.props.addMessage, this.props.deleteMessage), 'chat');
    }
  }

  componentDidMount() {
    if (this.props.scrollChat) {
      this.scrollToBottom();
    }
  }

  componentDidUpdate() {
    if (this.props.scrollChat) {
      this.scrollToBottom();
    }
  }

  handleScrolling(values) {
    if (values.top < 1) {
      this.props.scrollingChat(false);
    } else {
      this.props.scrollingChat(true);
    }
  }

  scrollToBottom() {
    this.refs.scrollbars.scrollToBottom();
  }

  render() {
    const { messages, user, chatsEnt, chatsRes } = this.props;
    const chats = getChats(chatsRes, chatsEnt);
    const width = 500;
    const widgetScreen = '/screen/chatsWidget?t=' + user.token;
    let copiyer = '';
    if (__CLIENT__) {
      copiyer = 'http://' + document.location.hostname + widgetScreen;
    }
    const hideMessage = (message) => {
      return () => this.props.hideMessage(message);
    };
    return (
      <div>
        Screen of chat
        <div>
          <Link to={widgetScreen} target="_blank">
            <Button>Открыть</Button>
          </Link>
          <CopyToClipboard text={copiyer}>
            <Button>Скопировать</Button>
          </CopyToClipboard>
        </div>
        <Row>
          <Col xs={12} md={12}>
            <SendMessageForm sendMessageFunc={this.props.sendMessageFunc} providers={this.props.providers} chats={chats} />
          </Col>
        </Row>
        <div className={styles.chats}>
          <Scrollbars universal
            onScrollFrame={this.handleScrolling.bind(this)}
            height={600}
            ref="scrollbars">
            {
              messages.map((message, index) =>
                <RenderMessage key={index} message={message} hideMessage={hideMessage(message)} banUser={this.props.banUser} getProviderUID={getProviderUID(chats)} />
              )
            }
          </Scrollbars>
          {
            !this.props.scrollChat &&
            <div onClick={this.scrollToBottom.bind(this)} className={styles.anotherMessagesWrap} style={{ width: width - 15 }}>
              <div className={cn(styles.anotherMessages)}>
                Сообщения ниже
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
