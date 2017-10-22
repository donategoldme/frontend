export function channelUrl(provider, {uid, slug}) {
  switch (provider) {
    case 'youtube':
    case 'gplus':
      return 'https://www.youtube.com/channel/' + uid;
    case 'twitch':
      return 'https://www.twitch.tv/' + uid;
    case 'peka2tv':
      return 'http://peka2.tv/' + (slug ? slug : uid);
    case 'goodgame':
      return 'https://goodgame.ru/channel/' + (slug ? slug : uid);
    default:
      return '';
  }
}

export function providerIco(provider) {
  switch (provider) {
    case 'youtube':
    case 'gplus':
      return 'http://youtube.com/favicon.ico';
    case 'twitch':
      return 'https://www.twitch.tv/favicon.ico';
    case 'goodgame':
      return 'https://goodgame.ru/images/favicon/favicon-16x16.png';
    case 'peka2tv':
      return 'http://peka2.tv/favicon.ico';
    default:
      return '';
  }
}
