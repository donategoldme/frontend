import React, {PropTypes} from 'react';
import {FormGroup, Button, ControlLabel, Form, Row, Col, Thumbnail,
        HelpBlock} from 'react-bootstrap';
import {UploaderModal} from 'containers/Uploader/modal';


export function NameForm(props) {
  let name = null;
  let cost = null;
  let voiceCost = null;
  let viewTime = null;
  let viewTemplate = null;
  const saveWidget = () => {
    return () => {
      const {widget} = props;
      widget.name = name.value;
      widget.cost = +cost.value;
      widget.voice_cost = +voiceCost.value;
      widget.view_time = +viewTime.value;
      widget.view_template = viewTemplate.value;
      return props.saveWidget(widget);
    };
  };
  const saveImage = () => {
    return (img) => props.editImage(props.widget.id, img);
  };
  const handleDelImage = () => {
    return () => props.editImage(props.widget.id, '');
  };
  const saveSound = () => {
    return (sound) => props.editSound(props.widget.id, sound);
  };
  const handleOpen = (tab) => {
    return () => {
      props.activingTab(tab);
      return props.dialogOpen();
    };
  };
  return (
      <Form>
        {props.dialog && <UploaderModal saveImage={saveImage()} saveSound={saveSound()} dialog={props.dialog} dialogOpen={props.dialogOpen}/>}
        <FormGroup>
          <ControlLabel>
            Название:
          </ControlLabel>
          <input type="text" className="form-control" defaultValue={props.widget.name} ref={(input) => name = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Минимальная стоимость:
          </ControlLabel>
            <input type="number" className="form-control" defaultValue={props.widget.cost} ref={(input) => cost = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Минимальная стоимость голоса:
          </ControlLabel>
            <input type="number" className="form-control" defaultValue={props.widget.voice_cost} ref={(input) => voiceCost = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Длительность показа на экране(в секундах):
          </ControlLabel>
            <input type="number" className="form-control" defaultValue={props.widget.view_time} ref={(input) => viewTime = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Шаблон показа на экране:
          </ControlLabel>
            <input type="text" className="form-control" defaultValue={props.widget.view_template} ref={(input) => viewTemplate = input} />
          <HelpBlock>{"{user} прислал {amount} рублей и сообщает: {message}"}</HelpBlock>
        </FormGroup>
        <Row>
        <Col xs={12} md={12}>
          <ControlLabel>
            Изображение:
          </ControlLabel>
        </Col>
        <Col xs={12} md={2}>
          <Thumbnail onClick={handleOpen(1)} src={props.widget.pic ? `/uploads/${props.userId}/pic/${props.widget.pic}` : '/uploads/default.png'} responsive>
          <p>{props.widget.pic}</p>
          </Thumbnail>
        </Col>
        <Button onClick={handleDelImage()}>Убрать</Button>
        </Row>
        <Row>
        <Col xs={12} md={12}>
          <ControlLabel>
            Звук:
          </ControlLabel>
        </Col>
        <Col xs={12} md={2}>
          <p>{props.widget.sound}</p>
          <Button onClick={handleOpen(2)}>редактировать</Button>
        </Col>
        </Row>
        <Button onClick={saveWidget()}>Save</Button>
      </Form>
  );
}

NameForm.propTypes = {
  widget: PropTypes.object.isRequired,
  saveWidget: PropTypes.func.isRequired,
  dialog: PropTypes.bool.isRequired,
  dialogOpen: PropTypes.func.isRequired,
  editImage: PropTypes.func.isRequired,
  editSound: PropTypes.func.isRequired,
  activingTab: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
