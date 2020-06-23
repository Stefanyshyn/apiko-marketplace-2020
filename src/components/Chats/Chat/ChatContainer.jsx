import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, generatePath } from 'react-router-dom';

import ChatView from './ChatView';
import { routes } from '../../../scenes/router';

import { UsersOperations } from '../../../models/users';

const mapStateToProps = (state, props) => {
  const productId = props?.chat?.productId || props?.chat?.product;
  const product = state.entities.products[productId];
  let userId = props?.chat?.ownerId;
  if (Number(userId) === Number(state.viewer.user)) {
    userId = product?.ownerId;
  }
  return {
    product: product,
    owner: state.entities.users[userId],
    fetchUser: state.users.fetchUser,
    userId: userId,
  };
};
const mapDispatchToProps = {
  fetchUser: UsersOperations.fetchUser,
};
const enhancer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const userId = this.props?.userId;
      if (!this.props?.owner) this.props.fetchUser(userId);
    },
  }),
  withHandlers({
    onClickChat: (props) => () => {
      props.history.push(
        generatePath(`${routes.inboxChat}`, {
          chatId: props.chat.id,
        }),
      );
    },
  }),
);
export default enhancer(ChatView);
