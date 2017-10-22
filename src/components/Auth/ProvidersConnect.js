import React, {PureComponent} from 'react';
import {Button} from 'react-bootstrap';

export class ProvidersConnect extends PureComponent {
  render() {
    const clientOnly = (url) => {
      if (__CLIENT__) {
        return () => window.open(url, '_blank');
      }
      return () => {};
    };
    return (
      <div className={'col-md-12'}>
        <Button onClick={clientOnly('/auth/twitch/callback')}>Twitch</Button>
        <Button onClick={clientOnly('/auth/gplus/callback')}>Youtube</Button>
        <Button onClick={clientOnly('/auth/peka2tv/callback')}>Peka2tv</Button>
        <Button onClick={clientOnly('/auth/goodgame/callback')}>Goodgame</Button>
      </div>
    );
  }
}

export default ProvidersConnect;
