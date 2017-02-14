import {createValidator, required, maxLength, integer, minInt, maxInt} from 'utils/validation';

const widgetValidation = createValidator({
  nickname: [maxLength(150)],
  message: [maxLength(300)],
  money: [required, integer, minInt(1), maxInt(1000000)],
});

export default widgetValidation;
