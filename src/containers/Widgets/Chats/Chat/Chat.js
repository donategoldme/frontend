import React, {PropTypes, PureComponent} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import cn from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import {addMessage, scrollingChat} from 'redux/modules/widgets/chats/chats';
import {subscribe} from 'redux/modules/centrifugo';
import {RenderMessage} from './Message';
const styles = require('./chats.scss');

function switcher(addToChat) {
  return (res) => {
    switch (res.data.type) {
      case 'new_message':
        if (res.data.message.type_message === 'CLEARCHAT') {
          break;
        }
        addToChat(res.data.message);
        break;
      default:
        break;
    }
  };
}

@connect(
  state => ({
    messages: state.chatsWidget.messages,
    scrollChat: state.chatsWidget.scrollChat,
    user: state.auth.user,
  }),
  {addMessage, subscribe, scrollingChat})
export default class ChatWidget extends PureComponent {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    scrollChat: PropTypes.bool.isRequired,
    subscribe: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    scrollingChat: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

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

  componentWillMount() {
    if (__CLIENT__) {
      this.props.subscribe(`$${this.props.user.id}/chats`, switcher(this.props.addMessage), 'chat');
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
    const {messages, user} = this.props;
    const width = 500;
    const widgetScreen = '/screen/chatsWidget?t=' + user.token;
    let copiyer = '';
    if (__CLIENT__) {
      copiyer = 'http://' + document.location.hostname + widgetScreen;
    }
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
        <div className={styles.chats}>
          <Scrollbars universal
          onScrollFrame={this.handleScrolling.bind(this)}
          height={600}
          ref="scrollbars">
          {
            messages.map((message) =>
            <RenderMessage message={message}/>
            )
          }
          </Scrollbars>
          {
            !this.props.scrollChat &&
            <div onClick={this.scrollToBottom.bind(this)} className={styles.anotherMessagesWrap} style={{width: width - 15}}>
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
