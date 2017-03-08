import React, {PropTypes} from 'react';
import { ChatsPrefWF as WidgetForm } from 'components/Forms/ChatsWF/ChatsPrefWF';
import {Modal} from 'react-bootstrap';

export function PrefsModalForm(props) {
  return (
      <div>
        <Modal bsSize="large" show={props.dialog} onHide={props.editStop}>
          <Modal.Header closeButton>
            <Modal.Title>Настройки отображения чатов</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <WidgetForm key={String(props.widget.id)} widget={props.widget} stop={props.editStop} saveWidget={props.saveWidget}/>
          </Modal.Body>
        </Modal>
      </div>
    );
}

PrefsModalForm.propTypes = {
  dialog: PropTypes.bool.isRequired,
  editStop: PropTypes.func.isRequired,
  saveWidget: PropTypes.func.isRequired,
  widget: PropTypes.object.isRequired,
};
