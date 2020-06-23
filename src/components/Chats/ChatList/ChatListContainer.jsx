import { compose } from 'recompose';
import { connect } from 'react-redux';

import ChatListView from './ChatListView';

const mapStateToProps = (state) => {
  return {
    fetchChats: state.chats.fetchChats,
  };
};
const enhancer = compose(connect(mapStateToProps));
export default enhancer(ChatListView);
