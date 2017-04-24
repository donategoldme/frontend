export function channelUrl(provider, uid) {
  switch (provider) {
    case 'youtube':
    case 'gplus':
      return 'https://www.youtube.com/channel/' + uid;
    case 'twitch':
      return 'https://www.twitch.tv/' + uid;
    default:
      return '';
  }
}

export function providerIco(provider) {
  switch (provider) {
    case 'youtube':
    case 'gplus':
      return 'https://s.ytimg.com/yts/img/favicon-vflz7uhzw.ico';
    case 'twitch':
      return 'https://www.twitch.tv/favicon.ico';
    default:
      return '';
  }
}
