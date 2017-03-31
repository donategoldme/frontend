import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Row, Button, Well} from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';
import 'rc-slider/assets/index.css';

import * as widgetActions from 'redux/modules/widgets/chats/chats';
import {subscribe} from 'redux/modules/centrifugo';
import {isLoaded, loadChats as loadWidgets} from 'redux/modules/widgets/chats/chats';
import ChatsAddForm from 'components/Forms/ChatsWF/ChatsAddForm';


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
    cgo: state.centrifugo,
  }),
  {...widgetActions, subscribe})
export default class ChatsConnect extends Component {
  static propTypes = {
    entities: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
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
    return (
          <div>
            <Helmet title={'Chats'}/>
            <Row>
              <h1>
                Виджет чатов
              </h1>
              <div>
                <p>Виджет для присоединёных чатов</p>
              </div>
              {error &&
                <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                {' '}
                {JSON.stringify(error)}
              </div>}
              <Button onClick={openingForm}>Присоединить новый чат</Button>
              {openChatForm && <ChatsAddForm/>}
            </Row>
            <Row>
              {
                results.map((id) =>
                <Well key={id}>
                {entities[id].slug}
                <Button onClick={handleDelete(entities[id])}>Удалить</Button>
                </Well>
                )
              }
            </Row>
          </div>
    );
  }
}
