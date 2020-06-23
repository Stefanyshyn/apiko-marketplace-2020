import { schema } from 'normalizr';

export const User = new schema.Entity('users');

export const Product = new schema.Entity('products', {
  owner: User,
});

export const Message = new schema.Entity('messages');

export const Chat = new schema.Entity('chats', {
  product: Product,
});

export const MessageList = [Message];
export const ChatList = [Chat];
export const ProductsList = [Product];
