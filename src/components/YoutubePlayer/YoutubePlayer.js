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
    last: PropTypes.bool.isRequired,
    viewedVideo: PropTypes.func.isRequired,
    viewNowVideo: PropTypes.func.isRequired,
    stopViewVideo: PropTypes.func.isRequired,
  }

  render() {
    const {video, viewedVideo, viewNowVideo, stopViewVideo, last} = this.props;
    const viewed = (vid) => {
      return () => {
        if (last) {
          stopViewVideo();
        }
        viewedVideo(vid);
      };
    };
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };
    const onready = () => {
      console.log('ready');
    };
    const onPlay = (vid) => {
      console.log('onPlay');
      return () => viewNowVideo(vid);
    };
    const onPause = () => {
      console.log('onPause');
      return stopViewVideo();
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
                    onPlay={onPlay(video)}                     // defaults -> noop
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
