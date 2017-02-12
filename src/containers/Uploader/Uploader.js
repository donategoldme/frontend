import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tabs, Tab, Col, Button, Row, Image, FormGroup, Form} from 'react-bootstrap';

import {toAudioObjects} from './utils';
import * as uploaderActions from 'redux/modules/uploader';


function UploadForm(props) {
  let input = null;
  const uploadFile = () => {
    const {upload, id} = props;
    return () => upload(id, input.files);
  };
  return (
      <Form>
        <FormGroup>
          <input className="form-control" type="file" ref={(file) => {input = file;}} />
          <Button className={'btn btn-success'} onClick={uploadFile()}>
          Загрузить
          </Button>
        </FormGroup>
      </Form>
    );
}

@connect((state) => ({
  error: state.uploader.error,
  images: state.uploader.images,
  sounds: state.uploader.sounds,
  user: state.auth.user,
  activeTab: state.uploader.activeTab,
}),
  dispatch => bindActionCreators(uploaderActions, dispatch)
)
export default class Uploader extends Component {
  static propTypes = {
    error: PropTypes.string,
    images: PropTypes.array.isRequired,
    sounds: PropTypes.array.isRequired,
    activeTab: PropTypes.number.isRequired,
    loadImages: PropTypes.func.isRequired,
    loadSounds: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    uploadSound: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    saveImage: PropTypes.func.isRequired,
    saveSound: PropTypes.func.isRequired,
    deleteSound: PropTypes.func.isRequired,
    dialogOpen: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.loadImages();
    this.props.loadSounds();
  }

  render() {
    const {error, images, sounds, user, uploadImage, uploadSound,
      deleteImage, deleteSound, saveImage, saveSound, dialogOpen,
      activeTab} = this.props;
    const audios = toAudioObjects(sounds, user.id);
    const delImage = (img) => {
      return () => deleteImage(img);
    };
    const delSound = (sound) => {
      return () => deleteSound(sound);
    };
    const handleSaveImage = (img) => {
      return () => {
        dialogOpen();
        return saveImage(img);
      };
    };
    const handlePlaySound = (sound) => {
      return () => {
        console.log(sound);
        return audios[sound].play();
      };
    };
    const handleSaveSound = (sound) => {
      return () => {
        dialogOpen();
        return saveSound(sound);
      };
    };
    return (
      <div>
        {error &&
          <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        <Tabs defaultActiveKey={activeTab} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Images">
              <Row>
                <Col xs={12} md={3}>
                  <UploadForm id={user.id} upload={uploadImage}/>
                </Col>
                <Col xs={12} md={9}>
                  {
                    images.map((img) =>
                      <Col xs={6} md={3}>
                        <Image onClick={handleSaveImage(img)} src={`/uploads/${user.id}/pic/${img}`} responsive/>
                        <Button onClick={delImage(img)}>Удалить</Button>
                      </Col>
                    )
                  }
                </Col>
              </Row>
            </Tab>
            <Tab eventKey={2} title="Sounds">
              <Row>
                <Col xs={12} md={3}>
                  <UploadForm id={user.id} upload={uploadSound}/>
                </Col>
                <Col xs={12} md={9} style={{padding: '0 5px'}}>
                    {
                        sounds.map((sound) =>
                        <Row style={{padding: '5px 0'}}>
                          <Col xs={2} md={1}>
                            <Button onClick={handlePlaySound(sound)}><span className="glyphicon glyphicon-play-circle"/></Button>
                          </Col>
                          <Col xs={2} md={1}>
                            <Button bsStyle="success" onClick={handleSaveSound(sound)}>+</Button>
                          </Col>
                          <Col xs={6} md={8}>{sound}</Col>
                          <Col xs={2} md={2}>
                            <Button bsStyle="danger" onClick={delSound(sound)}>Удалить</Button>
                          </Col>
                        </Row>
                        )
                    }
                </Col>
              </Row>
            </Tab>
        </Tabs>
      </div>
    );
  }
}
