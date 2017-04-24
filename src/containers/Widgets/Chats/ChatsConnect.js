import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Row, Button, Well, Col} from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';
// import 'rc-slider/assets/index.css';

import {providerIco, channelUrl} from 'utils/providers';
import * as widgetActions from 'redux/modules/widgets/chats/chats';
import {subscribe} from 'redux/modules/centrifugo';
import {isLoaded, loadChats as loadWidgets} from 'redux/modules/widgets/chats/chats';
import ChatsAddForm from 'components/Forms/ChatsWF/ChatsAddForm';

function checkerConnect(providers, results, chats) {
  const checked = [];
  providers.forEach((provider) => {
    let toPush = true;
    results.forEach((id) => {
      if (provider.uid === chats[id].channel_id) {
        if (provider.type_provider === chats[id].type ||
         (provider.type_provider === 'gplus' && chats[id].type === 'youtube')) {
          toPush = false;
        }
      }
    });
    // Object.keys(chats).map((key) => {
    //   if (provider.uid === chats[key].channel_id) {
    //     if (provider.type_provider === chats[key].type ||
    //      (provider.type_provider === 'gplus' && chats[key].type === 'youtube')) {
    //       toPush = false;
    //     }
    //   }
    // });
    if (toPush) {
      checked.push(provider);
    }
  });
  return checked;
}


@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(loadWidgets()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    entities: state.chatsWidget.entities,
    results: state.chatsWidget.results,
    error: state.chatsWidget.error,
    openChatForm: state.chatsWidget.openChatForm,
    providers: state.auth.providers,
    cgo: state.centrifugo,
  }),
  {...widgetActions, subscribe})
export default class ChatsConnect extends Component {
  static propTypes = {
    entities: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
    providers: PropTypes.array.isRequired,
    error: PropTypes.any,
    addChat: PropTypes.func.isRequired,
    removeChat: PropTypes.func.isRequired,
    openChatForm: PropTypes.bool.isRequired,
    openingForm: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    cgo: PropTypes.object.isRequired,
  };

  render() {
    const {error, entities, results, removeChat, openingForm,
    openChatForm} = this.props;
    // const styles = require('./chats.scss');
    const handleDelete = (chat) => {
      return () => {
        if (confirm('Вы действительно хотите удалить виджет?')) {
          return removeChat(chat);
        }
      };
    };
    const connecters = checkerConnect(this.props.providers, this.props.results, this.props.entities);
    const connecting = (provider) => () => this.props.addChat({url: channelUrl(provider.type_provider, provider.uid)});
    return (
          <div>
            <Helmet title={'Chats'}/>
            <Row>
              <h1>
                Виджет чатов
              </h1>
              <div>
                <p>Виджет для присоединёных чатов</p>
                <p>Можно подключить чат присоединёных аккаунтов сторонних сервисов(ссылка на подключение) с возможностью бана(нет) со страницы показа чатов(добавить ссылку на чат)</p>
                <p>Или подключить чаты по ссылке на канал стрима, но без возможности бана</p>
              </div>
              {error &&
                <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                {' '}
                {JSON.stringify(error)}
              </div>}
              {
                connecters.map((provider) =>
                <Well key={provider.id}>
                  <Row>
                    <Col xs={1} md={1}><img src={providerIco(provider.type_provider)}/></Col>
                    <Col xs={9} md={9}>
                      <a href={channelUrl(provider.type_provider, provider.uid)} target="_blank">
                        {provider.uid}
                      </a>
                    </Col>
                    <Col xs={2} md={2}>
                      <Button onClick={connecting(provider)}>Присоединить</Button>
                    </Col>
                  </Row>
                </Well>
                )
              }
              <Button onClick={openingForm}>Присоединить по ссылке</Button>
              {openChatForm && <ChatsAddForm/>}
            </Row>
            <Row>
              {
                results.map((id) =>
                <Well key={id}>
                  <Row>
                    <Col md={1} xs={1}><img src={providerIco(entities[id].type)}/></Col>
                    <Col md={9} xs={9}>
                      <a href={channelUrl(entities[id].type, entities[id].channel_id)} target="_blank">
                      {entities[id].channel_id}
                      {entities[id].slug !== entities[id].channel_id && '(' + entities[id].slug + ')'}
                      </a>
                    </Col>
                    <Col md={2} xs={2}>
                      <Button onClick={handleDelete(entities[id])}>Удалить</Button>
                    </Col>
                  </Row>
                </Well>
                )
              }
            </Row>
          </div>
    );
  }
}
