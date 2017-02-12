import {createValidator, required, maxLength, integer, minInt} from 'utils/validation';

const widgetValidation = createValidator({
  name: [required, maxLength(100)],
  description: [required, maxLength(300)],
  cost: [required, integer, minInt(1)],
  likes: [required, integer, minInt(0)],
  views: [required, integer, minInt(0)],
  duration: [required, integer, minInt(10)],
});
export default widgetValidation;

export const addVideoValidation = createValidator({
  url: [required],
});
