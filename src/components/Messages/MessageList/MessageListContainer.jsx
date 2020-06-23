import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  MessagesSelectors,
  MessagesOperations,
} from '../../../models/messages';

import MessageListView from './MessageListView';

const mapStateToProps = (state, props) => {
  const chatId = props?.match?.params?.chatId;

  return {
    messages: chatId
      ? MessagesSelectors.getMessages(state, chatId)
      : null,
    fetchMessages: state.messages.fetchMessages,
    sendMessage: state.messages.sendMessage,
    viewerId: state?.viewer?.user,
    settingFetch: state.messages.settingFetch[chatId],
    chatId,
  };
};
const mapDispatchToProps = {
  loadMessages: MessagesOperations.fetchMessages,
};
const enhancer = compose(
  withRouter,
  withProps({
    limit: 10,
  }),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      if (
        this.props.settingFetch?.hasMessages ||
        !this.props.sendMessage.isLoading
      ) {
        this.props.loadMessages(this.props.chatId, this.props.limit);
      }
    },
  }),
  withHandlers({
    isRowLoaded: (props) => ({ index }) => {
      return !!props.messages[index];
    },
    loadMoreRows: (props) => async () => {
      if (!props.fetchMessages.isLoading)
        props.loadMessages(props.chatId, props.limit);
    },
    onScroll: (props) => async ({ scrollTop, clientHeight }) => {
      if (clientHeight === 0) {
        return;
      }
      if (scrollTop === 0) {
        if (
          (!props.settingFetch || props.settingFetch?.hasMessages) &&
          !props.fetchMessages.isLoading
        ) {
          props.loadMessages(props.chatId, props.limit);
        }
      }
    },
  }),
);
export default enhancer(MessageListView);
