import React, {PropTypes} from 'react';
const styles = require('./chats.scss');

export function RenderMessage({message}) {
  // ss.key = index;
  return (
    <div style={{float: 'left', width: '100%'}} className={styles.messageWrap} dangerouslySetInnerHTML={{__html: message.full_render}}></div>
    // <div>{JSON.stringify(message)}</div>
  );
}

RenderMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
