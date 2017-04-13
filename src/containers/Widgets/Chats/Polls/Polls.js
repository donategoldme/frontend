import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
// import { asyncConnect } from 'redux-async-connect';

import {PollForm} from 'components';
import VoteChart from './Chart';
import * as createActions from 'redux/modules/widgets/chats/polls/createActions';
import * as actions from 'redux/modules/widgets/chats/polls/actions';
import {subscribe} from 'redux/modules/centrifugo';

function switcher(getPoll, savePoll, removePoll) {
  return (res) => {
    switch (res.data.type) {
      case actions.GET_POLL_WS:
        getPoll(res.data.poll);
        break;
      case actions.SAVE_POLL_WS:
        savePoll(res.data.poll);
        break;
      case actions.DELETE_POLL_WS:
        removePoll();
        break;
      default:
        break;
    }
  };
}
// @asyncConnect([{
//   deferred: true,
//   promise: ({store: {dispatch, getState}}) => {
//     const promises = [];
//     if (!isLoaded(getState())) {
//       promises.push(dispatch(getPoll()));
//     }
//     return Promise.all(promises);
//   }
// }])
@connect(
  state => ({
    poll: state.chatsWidget.poll,
    pollAddS: state.chatsWidget.pollAdd,
    user: state.auth.user,
  }),
  {subscribe, ...createActions})
export default class PollsWidget extends PureComponent {
  static propTypes = {
    poll: PropTypes.object,
    pollAddS: PropTypes.bool.isRequired,
    getPoll: PropTypes.func.isRequired,
    savePoll: PropTypes.func.isRequired,
    removePoll: PropTypes.func.isRequired,
    getPollWS: PropTypes.func.isRequired,
    savePollWS: PropTypes.func.isRequired,
    removePollWS: PropTypes.func.isRequired,
    pollAdd: PropTypes.func.isRequired,
    pollOnScreen: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentWillMount() {
    if (__CLIENT__) {
      const {getPollWS, savePollWS, removePollWS} = this.props;
      const callBacks = {
        message: switcher(getPollWS, savePollWS, removePollWS),
        subscribe: this.props.getPoll,
      };
      this.props.subscribe(`$${this.props.user.id}/chats`, callBacks, 'pollChart');
      this.props.getPoll();
    }
  }

  render() {
    const toStream = (view) => {
      return () => {
        return this.props.pollOnScreen(view);
      };
    };
    return (
      <div>
        Screen of polls
        <Button onClick={this.props.pollAdd}>Новый опрос</Button>
        {this.props.pollAddS && <PollForm onSubmit={this.props.savePoll}/>}
        {this.props.poll !== null ?
          <div>
            <Button onClick={toStream(true)}>Показать на стриме</Button>
            <Button onClick={toStream(false)}>Убрать со стрима</Button>
            <VoteChart poll={this.props.poll}/>
          </div>
          :
          <p>Опрос не создан</p>
        }
      </div>
    );
  }
}
