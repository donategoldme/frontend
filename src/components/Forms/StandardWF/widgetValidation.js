import {createValidator, required, maxLength, integer, minInt, maxInt, validateFile} from 'utils/validation';

const widgetValidation = createValidator({
  name: [required, maxLength(100)],
  cost: [required, integer, minInt(1)],
  voiceCost: [required, integer, minInt(1)],
  viewTime: [required, integer, minInt(0)],
  pic: [required, validateFile(['.png', '.gif'], 0, 5 * 1000 * 1000)],
  sound: [required, validateFile(['.ogg', '.mp3'], 0, 5 * 1000 * 1000)],
  soundVolume: [required, minInt(0), maxInt(100)]
});

export const nameValidation = createValidator({
  name: [required, maxLength(100)],
});
