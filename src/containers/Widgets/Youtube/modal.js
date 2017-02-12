import React, {PropTypes} from 'react';
import { YoutubeWF as WidgetForm } from 'components';
import {Modal} from 'react-bootstrap';

export function ModalForm(props) {
  let widget = {};
  if (props.widgets.length > 0) {
    widget = props.widgets[0];
  } else {
    widget = {id: 0, name: '', description: '', cost: 0};
  }

  return (
      <div>
        <Modal bsSize="large" show={props.dialog} onHide={props.editStop}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <WidgetForm formKey={String(widget.id)} key={String(widget.id)} initialValues={widget} stop={props.editStop}/>
          </Modal.Body>
        </Modal>
      </div>
    );
}

ModalForm.propTypes = {
  editStop: PropTypes.func.isRequired,
  dialog: PropTypes.bool.isRequired,
  widgets: PropTypes.array.isRequired,
};
