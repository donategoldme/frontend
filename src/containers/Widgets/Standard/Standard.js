import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Row, Button, Well, Col, Image} from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';
import Slider from 'rc-slider';
require('rc-slider/assets/index.css');

import * as widgetActions from 'redux/modules/widgets/standard';
import {isLoaded, load as loadWidgets} from 'redux/modules/widgets/standard';
import {NameForm} from 'components/Forms/StandardWF/StandardWF';
import {activingTab} from 'redux/modules/uploader';


@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadWidgets());
    }
  }
}])
@connect(
  state => ({
    widgets: state.standardWidget.widgets,
    results: state.standardWidget.results,
    error: state.standardWidget.error,
    dialog: state.standardWidget.dialog,
    userId: state.auth.user.id,
  }),
  {...widgetActions, activingTab})
export default class StandardWidget extends Component {
  static propTypes = {
    widgets: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
    error: PropTypes.any,
    dialog: PropTypes.bool.isRequired,
    dialogOpen: PropTypes.func.isRequired,
    createNew: PropTypes.func.isRequired,
    saveWidget: PropTypes.func.isRequired,
    deleteWidget: PropTypes.func.isRequired,
    editImage: PropTypes.func.isRequired,
    editSound: PropTypes.func.isRequired,
    openWidget: PropTypes.func.isRequired,
    activingTab: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
  };

  render() {
    const {error, dialog, dialogOpen, createNew, widgets, results, saveWidget,
    editImage, editSound, userId} = this.props;
    const styles = require('./standard.scss');
    const handleDelete = (id) => {
      return () => {
        if (confirm('Вы действительно хотите удалить виджет?')) {
          return this.props.deleteWidget(id);
        }
      };
    };
    const handleEdit = (id) => {
      return () => this.props.openWidget(id);
    };
    const handleActivate = (widget) => {
      return () => {
        widget.active = true;
        return saveWidget(widget);
      };
    };
    const handleChangeVolume = (widget) => {
      return (volume) => {
        widget.sound_volume = volume;
        return saveWidget(widget);
      };
    };
    return (
          <div>
            <Helmet title={'Donates'}/>
            <Row>
              <h1>
                YoutubeDJ
              </h1>
              <Helmet title="Youtube Widgets"/>
              <p>
                Виджет для создания плейлиста с помощью пользователей.
              </p>
              {error &&
                <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                {' '}
                {JSON.stringify(error)}
              </div>}
              <Button onClick={createNew}> Create</Button>
            </Row>
            <Row>
              {
                results.map((id) =>
                <Well className={widgets[id].active ? styles.active : ''}>
                {widgets[id].opened === undefined || !widgets[id].opened ?
                  <Row>
                    <Col xs={12} md={1}>
                      {widgets[id].pic ?
                        <Image src={`/uploads/${userId}/pic/${widgets[id].pic}`} responsive/>
                      :
                        null
                      }
                    </Col>
                    <Col xs={12} md={10}>
                      <Row>
                       <Col xs={6} md={3}>
                        Название: {widgets[id].name}
                       </Col>
                       <Col xs={6} md={3}>
                        Минимальная стоимость: {widgets[id].cost}
                       </Col>
                       <Col xs={6} md={3}>
                        Минимальная стоимость голоса: {widgets[id].voice_cost}
                       </Col>
                       <Col xs={6} md={3}>
                        Время показа: {widgets[id].view_time}
                       </Col>
                      </Row>
                      <Row>
                      <Col xs={6} md={3}>
                        <p>Громкость</p>
                        <Slider min={0} max={100} defaultValue={widgets[id].sound_volume} onAfterChange={handleChangeVolume(widgets[id])}/>
                       </Col>
                      </Row>
                    </Col>
                    <Col xs={12} md={1}>
                    <Button onClick={handleActivate(widgets[id])} title={(widgets[id].active ? 'ВЫКЛЮЧИТЬ ВИДЖЕТ' : 'ВКЛЮЧИТЬ ВИДЖЕТ')}>
                      <span className={'glyphicon' + (widgets[id].active ? ' glyphicon-minus-sign ' + styles.reded
                      : ' glyphicon-ok-circle ' + styles.greened)} aria-hidden="true"></span>
                    </Button>
                      <Button onClick={handleDelete(widgets[id].id)} title={'УДАЛИТЬ'}>
                        <span className={'glyphicon glyphicon-remove'} aria-hidden="true"></span>
                      </Button>
                      <Button onClick={handleEdit(widgets[id].id)} title={'ИЗМЕНИТЬ'}>
                        <span className={'glyphicon glyphicon-edit'} aria-hidden="true"></span>
                      </Button>
                    </Col>
                  </Row>
                  :
                <Row>
                    <Col xs={12} md={12}>
                      <NameForm activingTab={this.props.activingTab} userId={userId} editImage={editImage} editSound={editSound}
                      widget={widgets[id]} saveWidget={saveWidget} dialog={dialog} dialogOpen={dialogOpen}/>
                    </Col>
                  </Row>
                  }
                </Well>
                )
              }
            </Row>
          </div>
    );
  }
}
