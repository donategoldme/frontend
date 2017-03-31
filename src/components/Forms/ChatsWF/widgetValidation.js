import {createValidator, required, minLength} from 'utils/validation';

export const chatsAddValidation = createValidator({
  url: [required],
});

export const pollsValidate = createValidator({
  answer: [required, minLength(1)]
});
