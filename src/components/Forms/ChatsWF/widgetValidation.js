import {createValidator, required} from 'utils/validation';

const widgetValidation = createValidator({
  url: [required],
});

export default widgetValidation;
