import {
  schema
} from 'normalizr';

const video = new schema.Entity('videos');
const youtubeWidget = new schema.Entity('youtubeWidgets', {
  videos: [video],
});

export default [youtubeWidget];
