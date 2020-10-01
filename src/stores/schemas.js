import { schema } from 'normalizr';

export const UserSchema = new schema.Entity('users');

export const ProductSchema = new schema.Entity('products', {
  owner: UserSchema,
});
export const ProductCollecitionSchema = [ProductSchema];

export const UserColllectionSchema = [UserSchema];

export const OwnProductSchema = new schema.Entity('products');
export const OwnProductCollecitionSchema = [OwnProductSchema];

export const LatestProductSchema = new schema.Entity('products');
export const LatestProductColllectionSchema = [LatestProductSchema];

export const MessageSchema = new schema.Entity('messages');
export const MessageCollectionSchema = [MessageSchema];

export const ChatSchema = new schema.Entity('chats', {
  message: MessageSchema,
  product: ProductSchema,
  participants: [UserSchema],
});
export const ChatCollectionSchema = [ChatSchema];

// import { schema } from 'normalizr';

// export const User = new schema.Entity('users');

// export const Product = new schema.Entity('products', {
//   owner: User,
// });

// export const Message = new schema.Entity('messages');

// export const Chat = new schema.Entity('chats', {
//   product: Product,
// });

// export const MessageList = [Message];
// export const ChatList = [Chat];
// export const ProductsList = [Product];
