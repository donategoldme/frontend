import React, { PureComponent, PropTypes } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FieldGroup } from 'components/Forms/utils';

function selfChatsOnly(chats, providers) {
  return chats.filter((chat) => {
    let filtered = false;
    providers.forEach((prov) => {
      if ((prov.uid === chat.channel_id || prov.uid === chat.slug) &&
        (prov.type_provider === chat.type || (prov.type_provider === 'gplus' && chat.type === 'youtube'))) {
        filtered = true;
      }
    });
    return filtered;
  });
}

function chatsToStruct(chats) {
  const ch = [];
  chats.forEach((chat) => {
    const chatStruct = {};
    if (chat.type === 'youtube') { chat.type = 'gplus'; }
    chatStruct.provider_uid = chat.type === 'gplus' ? chat.channel_id : chat.slug;
    chatStruct.chat_name = chat.type;
    chatStruct.channel_id = chat.channel_id;
    ch.push(chatStruct);
  });
  return ch;
}

export default class SendMessageForm extends PureComponent {
  static propTypes = {
    sendMessageFunc: PropTypes.func.isRequired,
    chats: PropTypes.array.isRequired,
    providers: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ message: event.target.value });
  }
  render() {
    const chats = chatsToStruct(selfChatsOnly(this.props.chats, this.props.providers));
    console.log(chats);
    const sendMessage = (event) => {
      event.preventDefault();
      this.props.sendMessageFunc({ message: this.state.message, chats: chats });
      this.setState({ message: '' });
    };
    return (
      <form onSubmit={sendMessage}>
        <Row>
          <Col md={6} xs={12}>
            <FieldGroup id={'send_message'}
              onChange={this.onChange} value={this.state.message} />
          </Col>
          <Col md={2} xs={6}>
            <Button onClick={sendMessage}>Отправить</Button>
          </Col>
        </Row>
      </form>
    );
  }
}
