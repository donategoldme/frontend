import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import {FormGroup, Button, ControlLabel, FormControl, Form} from 'react-bootstrap';


import {addVideoValidation} from './widgetValidation';
import * as widgetActions from 'redux/modules/widgets/youtube';

@connect(
  state => ({
    saveError: state.youtubeWidget.saveError
  }),
  dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
  form: 'youtube-addVideo',
  fields: ['url'],
  validate: addVideoValidation,
})
export default class YoutubeAddVideoForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    addVideo: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    stop: PropTypes.func.isRequired,
  };

  render() {
    const {stop, fields: {url}, formKey, handleSubmit, invalid,
      pristine, addVideo, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    return (
      <Form>
        <FormGroup controlId="youtubeVideoUrl">
            <ControlLabel>Ссылка на youtube</ControlLabel>
            <FormControl placeholder="Название" {...url} />
          {url.error && url.touched && <div className="text-danger">{url.error}</div>}
        </FormGroup>
        <Button className="btn btn-default"
              onClick={() => stop(formKey)}
              disabled={submitting}>
          <i className="fa fa-ban"/> Cancel
        </Button>
        <Button className="btn btn-success"
              onClick={handleSubmit(() => addVideo(formKey, values.url)
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
