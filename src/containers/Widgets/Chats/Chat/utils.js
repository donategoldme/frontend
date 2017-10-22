export function getProviderUID(chats) {
  return (channelId) => {
    for (let index = 0; index < chats.length; index++) {
      if (chats[index].channel_id === channelId) {
        switch (chats[index].type) {
          case 'peka2tv':
          case 'goodgame':
          case 'twitch':
            return chats[index].slug;
          case 'gplus':
          case 'youtube':
            return chats[index].channel_id;
          default:
            console.log(chats[index]);
            return '';
        }
      }
    }
  };
}
