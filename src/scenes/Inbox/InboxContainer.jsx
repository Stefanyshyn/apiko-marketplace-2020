import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import InboxView from './InboxView';
import { ChatsSelectors, ChatsOperations } from '../../models/chats';

const mapStateToProps = (state) => {
  return {
    viewer: state.viewer.user,
    fetchApp: state.app,
    chats: ChatsSelectors.getChats(state),
    fetchChats: state.chats.fetchChats,
  };
};
const mapDispatchToProps = {
  fetchChats: ChatsOperations.fetchChats,
};
const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    async componentDidMount() {
      this.props.fetchChats();
    },
  }),
);

export default enhancer(InboxView);
