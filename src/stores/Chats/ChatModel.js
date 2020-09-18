import { types as t } from 'mobx-state-tree';
import { ProductModel } from '../Products/ProductModel';
import { UserModel } from '../Users/UserModel';
import { MessageModel } from '../Messages/MessageModel';

export const ChatModel = t
  .model('ChatModel', {
    id: t.identifierNumber,
    ownerId: t.number,
    productId: t.number,
    updatedAt: t.string,
    createdAt: t.string,

    message: t.reference(MessageModel),
    product: t.reference(ProductModel),

    user: t.reference(UserModel),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    product: snapshot.product || snapshot.productId,
    participants: undefined,
    user: snapshot.participants[0],
  }));
