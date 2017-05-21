import superagent from 'superagent';
import config from 'config';

export function getDonatePagePref(username) {
  // return superagent.get('http://' + config.apiHost + ':' + config.apiPort + config.apiPath + '/public/standard?username=' + username);
  return superagent.get(config.apiPath + '/public/standard?username=' + username);
}

export function createStandardDonate(donate) {
  // return superagent.post('http://' + config.apiHost + ':' + config.apiPort + config.apiPath + '/public/standard').send(donate);
  return superagent.post(config.apiPath + '/public/standard').send(donate);
}
