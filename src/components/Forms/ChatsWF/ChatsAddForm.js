import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import {FormGroup, Button, ControlLabel, FormControl, Form} from 'react-bootstrap';


import {chatsAddValidation as validations} from './widgetValidation';
import * as widgetActions from 'redux/modules/widgets/chats/chats';

@connect(
  state => ({
    error: state.chatsWidget.error
  }),
  dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
  form: 'chats-add',
  fields: ['url'],
  validate: validations,
})
export default class ChatsAddForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    addChat: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    values: PropTypes.object.isRequired,
    openingForm: PropTypes.func.isRequired,
  };

  render() {
    const {fields: {url}, handleSubmit, invalid,
      pristine, addChat, submitting, values, openingForm } = this.props;
    return (
      <Form onSubmit={handleSubmit(() => {
        addChat(values)
                .then(result => {
                  openingForm();
                  if (result && typeof result.error === 'object') {
                    return Promise.reject(result.error);
                  }
                });}
              )}>
        <FormGroup controlId="ChatUrl">
            <ControlLabel>Ссылка на стрим</ControlLabel>
            <FormControl placeholder="Ссылка на канал" {...url} />
          {url.error && url.touched && <div className="text-danger">{url.error}</div>}
        </FormGroup>
        <Button className="btn btn-default"
              onClick={openingForm}
              disabled={submitting}>
          <i className="fa fa-ban"/> Cancel
        </Button>
        <Button className="btn btn-success"
              onClick={handleSubmit(() => {
                addChat(values)
                .then(result => {
                  openingForm();
                  if (result && typeof result.error === 'object') {
                    return Promise.reject(result.error);
                  }
                });}
              )}
              disabled={pristine || invalid || submitting}>
          <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
        </Button>
      </Form>
    );
  }
}
