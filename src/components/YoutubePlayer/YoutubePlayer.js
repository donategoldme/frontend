import React, {Component, PropTypes} from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import * as widgetActions from 'redux/modules/widgets/youtube';

@connect(
  state => ({
    widgets: state.youtubeWidget.data,
    editing: state.youtubeWidget.editing,
    error: state.youtubeWidget.error,
    dialog: state.youtubeWidget.dialog,
    deleting: state.youtubeWidget.deleting,
    activing: state.youtubeWidget.activing,
  }),
  {...widgetActions})
export default class YoutubePlayer extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    viewedVideo: PropTypes.func.isRequired,
  }

  render() {
    const {video, viewedVideo} = this.props;
    const viewed = (vid) => {
      return () => viewedVideo(vid);
    };
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };
    const onready = () => {
      console.log('ready');
    };
    const onPlay = () => {
      console.log('onPlay');
    };
    const onPause = () => {
      console.log('onPause');
    };
    return (
        <div>
            {/* <Row>
            <Button onClick={viewed(video)}>Pass</Button>
            </Row> */}
            <div className="embed-responsive embed-responsive-16by9">
                <YouTube
                    videoId={video.video_id}                  // defaults -> null
                    // id={video.id}                       // defaults -> null
                    // className={string}                // defaults -> null
                    opts={opts}                        // defaults -> {}
                    onReady={onready}                    // defaults -> noop
                    onPlay={onPlay}                     // defaults -> noop
                    onPause={onPause}                    // defaults -> noop
                    onEnd={viewed(video)}                      // defaults -> noop
                    // onError={func}                    // defaults -> noop
                    // onStateChange={onStateChange}              // defaults -> noop
                    // onPlaybackRateChange={func}       // defaults -> noop
                    // onPlaybackQualityChange={func}    // defaults -> noop
                />
            </div>
        </div>
    );
  }
}
