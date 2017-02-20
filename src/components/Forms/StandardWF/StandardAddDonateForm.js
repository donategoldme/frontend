import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import {FormGroup, Button, ControlLabel, FormControl, Form} from 'react-bootstrap';


import validations from './widgetValidation';
import * as widgetActions from 'redux/modules/widgets/standard';

@connect(
  state => ({
    error: state.standardWidget.error
  }),
  dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
  form: 'standard-addDonate',
  fields: ['nickname', 'message', 'money', 'viewed'],
  validate: validations,
  initialValues: {viewed: true},
})
export default class StandardAddDonateForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    addDonate: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    values: PropTypes.object.isRequired,
    openAddDonateForm: PropTypes.func.isRequired,
  };

  render() {
    const {openAddDonateForm, fields: {nickname, message, money, viewed}, handleSubmit, invalid,
      pristine, addDonate, submitting, values } = this.props;
    console.log(viewed);
    return (
      <Form>
        <FormGroup controlId="youtubeVideoUrl">
            <ControlLabel>Имя пользователя</ControlLabel>
            <FormControl placeholder="Название" {...nickname} />
          {nickname.error && nickname.touched && <div className="text-danger">{nickname.error}</div>}
        </FormGroup>
        <FormGroup controlId="youtubeVideoUrl">
            <ControlLabel>Сообщение</ControlLabel>
            <FormControl placeholder="Название" {...message} />
          {message.error && message.touched && <div className="text-danger">{message.error}</div>}
        </FormGroup>
        <FormGroup controlId="youtubeVideoUrl">
            <ControlLabel>Сумма</ControlLabel>
            <FormControl placeholder="Название" {...money} />
          {money.error && money.touched && <div className="text-danger">{money.error}</div>}
        </FormGroup>
        <FormGroup controlId="youtubeVideoUrl">
            <ControlLabel>Показать на стриме <input type="checkbox" {...viewed}/></ControlLabel>
          {viewed.error && viewed.touched && <div className="text-danger">{viewed.error}</div>}
        </FormGroup>
        <Button className="btn btn-default"
              onClick={openAddDonateForm}
              disabled={submitting}>
          <i className="fa fa-ban"/> Cancel
        </Button>
        <Button className="btn btn-success"
              onClick={handleSubmit(() => {
                values.viewed = !values.viewed;
                addDonate(values)
                .then(result => {
                  openAddDonateForm();
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
