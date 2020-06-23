import { connect } from 'react-redux';
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import ContactSellerView from './ContactSellerView';
import { ChatsOperations } from '../../../models/chats';
import { MessagesOperations } from '../../../models/messages';
import { withRouter, generatePath } from 'react-router-dom';
import { routes } from '../../../scenes/router';
import { ProductsOperations } from '../../../models/products';

const mapStateToPropps = (state) => {
  let createChat = state.chats.createChat;
  let sendMessage = state.messages.sendMessage;
  return {
    fetchSend: {
      isLoading: createChat.isLoading || sendMessage.isLoading,
      isError: createChat.isError || sendMessage.isError,
      error: createChat.error || sendMessage.error,
    },
    fetchProduct: state.products.addSaveFetchProduct.fetchProduct,
  };
};
const mapDisatchToPropps = {
  createChat: ChatsOperations.createChat,
  sendMessage: MessagesOperations.sendMessage,
  fetchProduct: ProductsOperations.fetchProduct,
};

const enhancer = compose(
  withRouter,
  withState('text', 'setText', ''),
  connect(mapStateToPropps, mapDisatchToPropps),
  lifecycle({
    componentDidMount() {
      if (
        !this.props.fetchProduct.isLoading ||
        !this.props.product.chatId
      ) {
        this.props.fetchProduct(this.props.product.id);
      }
    },
  }),
  withHandlers({
    onSubmit: (props) => async (event) => {
      event.preventDefault();

      try {
        if (props.product?.chatId)
          await props.sendMessage(
            props.product.chatId,
            props.text.trim(),
          );
        else
          await props.createChat(props.product.id, props.text.trim());
        props.history.push(
          generatePath(routes.inboxChat, {
            chatId: props.product.chatId,
          }),
        );
      } catch (err) {
        //if we create new chat in store we hane old date
        //then thoght err pass chatId
        props.history.push(
          generatePath(routes.inboxChat, {
            chatId: err.chatId,
          }),
        );
      }
    },
    onChange: (props) => (event) => {
      const { value } = event.target;
      props.setText(value);
    },
  }),
);

export default enhancer(ContactSellerView);
