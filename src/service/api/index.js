import auth from './auth';
import user from './user';
import upload from './upload';
import products from './products';
import chats from './chats';
import messages from './messages';
import SocketApi from './SocketApi';
import * as schemas from './schemas';

export { schemas };

const init = () => {
  auth.init();
};
export default {
  auth,
  user,
  upload,
  messages,
  chats,
  products,
  SocketApi,
  init: init,
};
