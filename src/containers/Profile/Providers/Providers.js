import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import {providerIco, channelUrl} from 'utils/providers';
import {removeProvider} from 'redux/modules/auth';
import {ProvidersConnect} from 'components/Auth/ProvidersConnect';


@connect(
  state => ({
    user: state.auth.user,
    providers: state.auth.providers,
  }), {removeProvider})
export default class Providers extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    providers: PropTypes.array.isRequired,
  };

  render() {
    const handleDelete = (provider) => {
      return () => {
        if (confirm('Вы действительно хотите удалить виджет?')) {
          return this.props.removeProvider(provider);
        }
      };
    };
    return (
      <div>
        <h1>Подключение аккаунтов сторонних сервисов</h1>
        <ProvidersConnect/>
        <div className={'col-md-12'}>
        {this.props.providers.map((provider) =>
          <div key={provider.id} className={'col-md-12'}>
            <div className={'col-md-1'}><img src={providerIco(provider.type_provider)} style={{width: 16, height: 16}}/></div>
            <div className={'col-md-6'}><a href={channelUrl(provider.type_provider, {uid: provider.uid})} target="_blank">{provider.uid}</a></div>
            <div className={'col-md-5'}><Button onClick={handleDelete(provider)}>Удалить</Button></div>
          </div>
        )}
        </div>
      </div>
    );
  }
}
