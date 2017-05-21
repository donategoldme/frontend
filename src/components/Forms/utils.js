import React from 'react';
import {FormGroup, Button, ControlLabel, Row, Col, Thumbnail,
        HelpBlock, FormControl} from 'react-bootstrap';
import { SketchPicker } from 'react-color';

export function FieldGroup({id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export function TextAreaGroup({id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
        <FormControl componentClass="textarea" placeholder="textarea" {...props}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export function ColorGroup({id, label, help, color, onChange }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <SketchPicker
            color={JSON.parse(color || '{}')}
            onChangeComplete={onChange}
          />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export function ImgGroup({label, img, onChange, userId, onDelete}) {
  return (
    <Row>
      <Col xs={12} md={12}>
        <ControlLabel>
          {label}
        </ControlLabel>
      </Col>
      <Col xs={12} md={2}>
        <Thumbnail onClick={onChange} src={img ? `/uploads/${userId}/pic/${img}` : '/uploads/default.png'} responsive>
        <p>{img}</p>
        </Thumbnail>
      </Col>
      <Button onClick={onDelete}>Убрать</Button>
    </Row>
  );
}

export function FontGroup({id, label, onChange, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl type={"text"} {...props} onChange={onChange} />
      <HelpBlock>Выберите шрифт на странице <a href="https://fonts.google.com/" target="_blank">google fonts</a> и скопируйте название.</HelpBlock>
    </FormGroup>
  );
}
