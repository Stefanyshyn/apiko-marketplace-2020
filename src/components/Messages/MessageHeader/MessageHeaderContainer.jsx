import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MessageHeaderView from './MessageHeaderView';

import { UsersOperations } from '../../../models/users';
import { ProductsOperations } from '../../../models/products';

const mapStateToProps = (state, props) => {
  let chat = state.entities.chats[props.chatId];
  const productId = chat?.productId || chat?.product;
  const product = state.entities.products[productId];
  let userId = chat?.ownerId;
  if (Number(userId) === Number(state.viewer.user)) {
    userId = product?.ownerId;
  }
  return {
    product: product,
    user: state.entities.users[userId],
  };
};
const mapDispatchToProps = {
  fetchUser: UsersOperations.fetchUser,
  fetchProduct: ProductsOperations.fetchProduct,
};
const enhancer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);
export default enhancer(MessageHeaderView);
