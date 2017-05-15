import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as widgetActions from 'redux/modules/widgets/youtube';
import {initializeWithKey} from 'redux-form';
import CopyToClipboard from 'react-copy-to-clipboard';

import { asyncConnect } from 'redux-async-connect';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {isLoaded, load as loadWidgets} from 'redux/modules/widgets/youtube';
import {ModalForm} from './modal';
import { YoutubeAddVideoForm as AddVideoForm, YoutubePlayer } from 'components';


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
    widgets: state.youtubeWidget.data,
    editing: state.youtubeWidget.editing,
    error: state.youtubeWidget.error,
    dialog: state.youtubeWidget.dialog,
    deleting: state.youtubeWidget.deleting,
    activing: state.youtubeWidget.activing,
    user: state.auth.user
  }),
  {...widgetActions, initializeWithKey })
export default class YoutubeWidget extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.string,
    user: PropTypes.object.isRequired,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.number.isRequired,
    activing: PropTypes.number.isRequired,
    deleting: PropTypes.number.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    editStop: PropTypes.func.isRequired,
    dialog: PropTypes.bool.isRequired,
    deleteWidget: PropTypes.func.isRequired,
    activeWidget: PropTypes.func.isRequired,
    openWidget: PropTypes.func.isRequired,
    addVideoDialog: PropTypes.func.isRequired,
    viewedVideo: PropTypes.func.isRequired,
  };

  render() {
    const handleEdit = (id) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(id);
    };
    const handleActive = (id) => {
      const {activeWidget} = this.props;
      return () => activeWidget(id);
    };
    const handleDelete = (id) => {
      const {deleteWidget} = this.props;
      return () => deleteWidget(id);
    };
    const handleOpen = (id) => {
      const {openWidget} = this.props;
      return () => openWidget(id);
    };
    const handleOpenAddVideo = (id) => {
      const {addVideoDialog} = this.props;
      return () => addVideoDialog(id);
    };
    const viewed = (vid) => {
      const {viewedVideo} = this.props;
      return () => viewedVideo(vid);
    };
    const {widgets, error, editing, editStop, dialog, deleting, addVideoDialog, user} = this.props;
    const styles = require('./youtube.scss');
    const widgetScreen = '/screen/chatsWidget?t=' + user.token;
    let copiyer = '';
    if (__CLIENT__) {
      copiyer = 'http://' + document.location.hostname + widgetScreen;
    }
    return (
      <Row className={styles.widgets}>
      {dialog && <ModalForm dialog={dialog} editStop={editStop} editing={editing}
      widgets={widgets.filter((widget) => widget.id === editing)}/>}
        <h1>
          YoutubeDJ
        </h1>
        <Helmet title="Youtube Widgets"/>
        <p>
          Виджет для создания плейлиста с помощью пользователей.
        </p>
        <div>
          <Link to={widgetScreen} target="_blank">
            <Button>Открыть</Button>
          </Link>
          <CopyToClipboard text={copiyer}>
            <Button>Скопировать</Button>
          </CopyToClipboard>
        </div>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        <Button className={styles.refreshBtn + ' btn btn-success'} onClick={handleEdit(0)}>
            Создать
        </Button>
        {widgets && widgets.length &&
        <Row>
          <Row>
            {
            widgets.map((widget) =>
            <Well key={widget.id}>
                <Row>
                  <Col xs={12} md={2}>{widget.name}</Col>
                  <Col xs={12} md={3}>Стоимость: {widget.cost}</Col>
                  <Col xs={12} md={3}>Плейлист: {widget.videos.length || 0}</Col>
                    <Button onClick={handleActive(widget.id)} title={(widget.active ? 'ВЫКЛЮЧИТЬ ВИДЖЕТ' : 'ВКЛЮЧИТЬ ВИДЖЕТ')}>
                      <span className={'glyphicon' + (widget.active ? ' glyphicon-minus-sign ' + styles.reded
                      : ' glyphicon-ok-circle ' + styles.greened)} aria-hidden="true"></span>
                    </Button>
                    <Button onClick={handleEdit(widget.id)} title={'ИЗМЕНИТЬ'}>
                      <span className={'glyphicon glyphicon-edit'} aria-hidden="true"></span>
                    </Button>
                    <Button onClick={handleDelete(widget.id)} title={'УДАЛИТЬ'}>
                      <span className={'glyphicon glyphicon-remove ' + styles.reded} aria-hidden="true"></span>
                    </Button>
                    <button className="btn btn-primary" disabled={deleting === widget.id} onClick={handleOpen(widget.id)}>
                      <i className="fa fa-pencil"/> Open
                    </button>
                </Row>
                <Row>
                  {
                  widget.addVideoOpen
                  ?
                  <AddVideoForm formKey={String(widget.id)} key={String(widget.id)} stop={addVideoDialog}/>
                  :
                    <Button onClick={handleOpenAddVideo(widget.id)} title={'ДОБАВИТЬ'}>
                      <span className={'glyphicon glyphicon-plus ' + styles.greened} aria-hidden="true"></span>
                    </Button>
                  }
                </Row>
                <Row className={(widget.opened) ? {} : styles.hide}>
                {widget.videos.length > 0 && widget.opened
                  ?
                  <div>
                  <Col xs={12} md={8}>
                    <YoutubePlayer video={widget.videos[0]} last={widget.videos.length < 2 ? true : false} />
                  </Col>
                  <Col xs={12} md={4}>
                    <Row>
                      <Button onClick={viewed(widget.videos[0])}>Пропустить</Button>
                    </Row>
                    <div className={styles.overflow}>
                    {
                      widget.videos.map((video) =>
                      <Row className={styles.videoBorder}>
                      <Col xs={11} md={11}>
                      <p key={video.id} className={styles.videoTitle}>{video.title}</p>
                      </Col>
                      <Col xs={1} md={1} className={styles.noPadding}>
                      <span onClick={viewed(video)} className={'glyphicon glyphicon-remove ' + styles.reded + ' ' + styles.pointer} aria-hidden="true"></span>
                      </Col>
                      <Col md={12}>
                        {video.views}
                        <span className={'glyphicon glyphicon-eye-open'} aria-hidden="true"/> {'  '}
                        {video.likes}
                        <span className={'glyphicon glyphicon-thumbs-up'} aria-hidden="true"/> {' '}
                        {Math.floor(video.duration / 60) + '.' + video.duration % 60}
                        <span className={'glyphicon glyphicon-hourglass'} aria-hidden="true"/> {' '}
                      </Col>
                      <span role={'separator'} className={'divider'} />
                      </Row>
                      )
                    }
                    </div>
                  </Col>
                  </div>
                  :
                  <div className="progress col-md-6">
                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>
                      Ждём поступления
                      <span className="sr-only"></span>
                    </div>
                  </div>
                }
                </Row>
            </Well>)
            }
          </Row>
        </Row>}
      </Row>
    );
  }
}

