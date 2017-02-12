import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import {FormGroup, Button, ControlLabel, FormControl, Form} from 'react-bootstrap';


import widgetValidation from './widgetValidation';
import * as widgetActions from 'redux/modules/widgets/youtube';

@connect(
  state => ({
    saveError: state.youtubeWidget.saveError
  }),
  dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
  form: 'youtube-wf',
  fields: ['id', 'name', 'description', 'cost', 'views', 'likes', 'duration'],
  validate: widgetValidation
})
export default class YoutubeWF extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    stop: PropTypes.func.isRequired,
  };

  render() {
    const { stop, fields: {name, description, cost, views, likes, duration}, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    return (
      <Form>
        <FormGroup controlId="youtubeName">
            <ControlLabel>Название</ControlLabel>
            <FormControl placeholder="Название" {...name} />
          {name.error && name.touched && <div className="text-danger">{name.error}</div>}
        </FormGroup>
        <FormGroup controlId="youtubeDesc">
            <ControlLabel>Описание</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Описание" {...description} />
          {description.error && description.touched && <div className="text-danger">{description.error}</div>}
        </FormGroup>
        <FormGroup controlId="youtubeCost">
            <ControlLabel>Цена заказа</ControlLabel>
            <FormControl type="number" placeholder="Цена заказа" {...cost} />
          {cost.error && cost.touched && <div className="text-danger">{cost.error}</div>}
        </FormGroup>
        <FormGroup controlId="youtubeViews">
            <ControlLabel>Минимум просмотров</ControlLabel>
            <FormControl type="number" placeholder="Цена заказа" {...views} />
          {views.error && views.touched && <div className="text-danger">{views.error}</div>}
        </FormGroup>
        <FormGroup controlId="youtubeLikes">
            <ControlLabel>Минимум лайков</ControlLabel>
            <FormControl type="number" placeholder="Цена заказа" {...likes} />
          {likes.error && likes.touched && <div className="text-danger">{likes.error}</div>}
        </FormGroup>
        <FormGroup controlId="youtubeDuration">
            <ControlLabel>Максимальная длительность(в секундах)</ControlLabel>
            <FormControl type="number" placeholder="Цена заказа" {...duration} />
          {duration.error && duration.touched && <div className="text-danger">{duration.error}</div>}
        </FormGroup>
        <Button className="btn btn-default"
              onClick={() => stop(formKey)}
              disabled={submitting}>
          <i className="fa fa-ban"/> Cancel
        </Button>
        <Button className="btn btn-success"
              onClick={handleSubmit(() => save(values)
                .then(result => {
                  if (result && typeof result.error === 'object') {
                    return Promise.reject(result.error);
                  }
                })
              )}
              disabled={pristine || invalid || submitting}>
          <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
        </Button>
        {saveError && <div className="text-danger">{saveError}</div>}
      </Form>
    );
  }
}
