import React, {PropTypes} from 'react';
import {Popover, OverlayTrigger, ButtonToolbar, Button} from 'react-bootstrap';
import cn from 'classnames';
const styles = require('./chats.scss');

const defaultModeratorIcon = require('./moderator.png');
const defaultSubscriberIcon = require('./subscriber.png');

// function MessageR({message}) {
//   return (
//     <div className={styles.messageWrap} dangerouslySetInnerHTML={{__html: message.full_render}}></div>
//   );
// }

function toWithType(typeChat) {
  return (className) => styles[typeChat + className];
}

function banUserOverlay(message, banUser, getProviderUID) {
  if (message.chat_name === 'youtube') {message.chat_name = 'gplus';}
  const ban = (time) => {
    return () => banUser({user_id: message.uid, chat_name: message.chat_name, channel_id: message.channel_id, provider_uid: getProviderUID(message.channel_id), time: time});
  };
  return (
    <Popover id="popover-trigger-click-root-close" title={'Забанить ' + message.display_name}>
      За сообщение <p dangerouslySetInnerHTML={{__html: message.smiles_render}}/>
      <ButtonToolbar>
        <Button onClick={ban(1)}>0</Button>
        <Button onClick={ban(30 * 60)}>30 мин</Button>
        <Button onClick={ban(60 * 60)}>1 час</Button>
        <Button onClick={ban(10 * 60 * 60)}>10 час</Button>
        <Button onClick={ban(24 * 60 * 60)}>1 сутки</Button>
        <Button onClick={ban(30 * 24 * 60 * 60)}>1 месяц</Button>
      </ButtonToolbar>
    </Popover>
  );
}

function MessageR({message, banUser, getProviderUID}) {
  const ct = toWithType(message.chat_name);
  return (
    <div className={cn(styles.fullMessage, ct('FullMessage'))}>
      <div className={cn(styles.nicknameBadge, ct('NicknameBadge'))}>
        {message.moderator && <img className={cn(styles.badge, ct('Badge'))} src={message.moderator_url ? message.moderator_url : defaultModeratorIcon} alt="moderator" />}
        {message.subscriber && <img className={cn(styles.badge, ct('Subscriber'))} src={message.subscriber_url ? message.subscriber_url : defaultSubscriberIcon} alt="moderator" />}
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={banUserOverlay(message, banUser, getProviderUID)}>
          <p className={cn(styles.nickname, ct('Nickname'))}>{message.display_name}</p>
        </OverlayTrigger>
      </div>
      <span className={cn(styles.separator, ct('Separator'))}></span>
      <div className={cn(styles.message, ct('Message'))} dangerouslySetInnerHTML={{__html: message.smiles_render}}/>
    </div>
  );
}


export function RenderMessage({message, hideMessage, banUser, getProviderUID}) {
  if (message.deleted && message.hide) {
    return <div style={{float: 'left', width: '100%'}}>Сообщение от {message.display_name} удалено. <span onClick={hideMessage}>Показать</span></div>;
  }
  const Message = <MessageR message={message} banUser={banUser} hideMessage={hideMessage} getProviderUID={getProviderUID}/>;
  if (message.deleted && !message.hide) {
    return (
      <div style={{float: 'left', width: '100%'}}>
        {Message}
        <div onClick={hideMessage}>Убрать сообщение</div>
      </div>
    );
  }
  return (
    <div style={{float: 'left', width: '100%'}}>
      {Message}
    </div>
  );
}

RenderMessage.propTypes = {
  message: PropTypes.object.isRequired,
  hideMessage: PropTypes.func.isRequired,
  banUser: PropTypes.func.isRequired,
  getProviderUID: PropTypes.func.isRequired,
};
