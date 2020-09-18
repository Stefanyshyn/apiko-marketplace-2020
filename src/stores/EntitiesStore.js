import { types } from 'mobx-state-tree';
import { ProductsCollection } from './Products/ProductsCollection';
import { UsersCollection } from './Users/UsersCollection';
import { ChatsCollection } from './Chats/ChatsCollection';
import { MessagesCollection } from './Messages/MessagesCollection';
export const EntitiesStore = types
  .model('EntitiesStore', {
    products: ProductsCollection,
    users: UsersCollection,
    chats: ChatsCollection,
    messages: MessagesCollection,
  })
  .actions((store) => ({
    merge(entities) {
      Object.keys(entities).forEach((nameCollection) => {
        const entitiesCollection = entities[nameCollection];

        Object.entries(entitiesCollection).forEach(([id, value]) => {
          store[nameCollection].add(id, value);
        });
      });
    },
  }));
