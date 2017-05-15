import React, {PropTypes} from 'react';
import { Uploader } from 'containers';
import {Modal} from 'react-bootstrap';

export function UploaderModal(props) {
  return (
      <div>
        <Modal bsSize="large" show={props.dialog} onHide={props.dialogOpen}>
          <Modal.Header closeButton>
            <Modal.Title>Загрузка файлов</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Uploader dialogOpen={props.dialogOpen} saveImage={props.saveImage} saveSound={props.saveSound}/>
          </Modal.Body>
        </Modal>
      </div>
    );
}

UploaderModal.propTypes = {
  dialog: PropTypes.bool.isRequired,
  dialogOpen: PropTypes.func.isRequired,
  saveImage: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object]).isRequired,
  saveSound: PropTypes.func.isRequired,
};
