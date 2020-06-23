import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import viewer from './viewer';
import products from './products';
import chats from './chats';
import messages from './messages';
import users from './users';
import entities from './entities';
export default combineReducers({
  app,
  auth,
  viewer,
  products,
  entities,
  chats,
  users,
  messages,
});
