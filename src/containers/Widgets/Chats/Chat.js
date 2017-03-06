import React, {PropTypes, PureComponent} from 'react';
// import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import cn from 'classnames';

import {addMessage, scrollingChat} from 'redux/modules/widgets/chats';
import {subscribe} from 'redux/modules/centrifugo';
import {RenderMessage} from './Message';
const styles = require('./chats.scss');

@connect(
  state => ({
    messages: state.chatsWidget.messages,
    scrollChat: state.chatsWidget.scrollChat,
    user: state.auth.user,
  }),
  {addMessage, subscribe, scrollingChat})
export class ChatNew extends PureComponent {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    scrollChat: PropTypes.bool.isRequired,
    subscribe: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    scrollingChat: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.scrollChat) {
      this.scrollToBottom();
    }
  }

  componentDidUpdate() {
    if (this.props.scrollChat) {
      this.scrollToBottom();
    }
  }

  componentWillMount() {
    this.props.subscribe(`$${this.props.user.id}/chats`, (res) => this.props.addMessage(res.data.message));
  }

  handleScrolling(values) {
    if (values.top < 1) {
      this.props.scrollingChat(false);
    } else {
      this.props.scrollingChat(true);
    }
  }

  scrollToBottom() {
    this.refs.scrollbars.scrollToBottom();
  }

  render() {
    const {messages} = this.props;
    const width = 500;
    return (
      <div style={{width: width}}>
        <Scrollbars universal autoHeight
        onScrollFrame={this.handleScrolling.bind(this)}
        autoHeightMin={400}
        autoHeightMax={width}
        ref="scrollbars">
        {
          messages.map((message) =>
          <RenderMessage message={message}/>
          )
        }
        </Scrollbars>
        {
          !this.props.scrollChat &&
          <div onClick={this.scrollToBottom.bind(this)} className={styles.anotherMessagesWrap} style={{width: width - 15}}>
            <div className={cn(styles.anotherMessages)}>
              Сообщения ниже
            </div>
          </div>
        }
      </div>
    );
  }
}

// @connect(
//   state => ({
//     messages: state.chatsWidget.messages,
//     user: state.auth.user,
//   }),
//   {addMessage, subscribe})
// export class Chat extends PureComponent {
//   static propTypes = {
//     messages: PropTypes.array.isRequired,
//     subscribe: PropTypes.func.isRequired,
//     addMessage: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired,
//   };

//   constructor(props, context) {
//     super(props, context);

//     this.state = {
//       listHeight: 300,
//       overscanRowCount: 10,
//       rowCount: this.props.messages.length,
//       scrollToIndex: this.props.messages.length - 1,
//     };

//     this._getRowHeight = this._getRowHeight.bind(this);
//     this._noRowsRenderer = this._noRowsRenderer.bind(this);
//     this._onRowCountChange = this._onRowCountChange.bind(this);
//     this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
//     this._rowRenderer = this._rowRenderer.bind(this);
//   }

//   componentWillMount() {
//     this.props.subscribe(`$${this.props.user.id}/chats`, (res) => this.props.addMessage(res.data.message));
//   }

//   render() {
//     return (
//         <div>
//               <List
//                 ref="List"
//                 className={styles.List}
//                 height={500}
//                 overscanRowCount={0}
//                 noRowsRenderer={this._noRowsRenderer}
//                 rowCount={this.props.messages.length}
//                 rowHeight={this._getRowHeight}
//                 rowRenderer={this._rowRenderer}
//                 scrollToIndex={this.props.messages.length - 1}
//                 width={450}
//               />
//         </div>
//     );
//   }

//   _getDatum(index) {
//     const { messages } = this.props;

//     return messages[index % messages.length];
//   }

//   _getRowHeight({ index }) {
//     const data = this._getDatum(index);
//     let lines = Math.ceil(data.text.length / 43);
//     lines += data.text.split('\n').length - 1;
//     return lines * 23;
//   }

//   _noRowsRenderer() {
//     return (
//       <div className={styles.noRows}>
//         No rows
//       </div>
//     );
//   }

//   _onRowCountChange(event) {
//     const rowCount = parseInt(event.target.value, 10) || 0;

//     this.setState({ rowCount });
//   }

//   _onScrollToRowChange(event) {
//     const { rowCount } = this.state;
//     let scrollToIndex = Math.min(rowCount - 1, parseInt(event.target.value, 10));

//     if (isNaN(scrollToIndex)) {
//       scrollToIndex = undefined;
//     }

//     this.setState({ scrollToIndex });
//   }

//   _rowRenderer({ index, key, style }) {
//     const datum = this._getDatum(index);
//     const height = this._getRowHeight({index});
//     // let additionalContent;
//     return (
//       <RenderMessage key={key} style={style} message={datum} id={index} height={height}/>
//     );
//   }
// }
