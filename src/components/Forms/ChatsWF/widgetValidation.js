import {createValidator, required} from 'utils/validation';

export const chatsAddValidation = createValidator({
  url: [required],
});

