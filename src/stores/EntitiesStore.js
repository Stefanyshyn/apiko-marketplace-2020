import { getRoot, types } from 'mobx-state-tree';
import { ProductsCollection } from './Products/ProductsCollection';
import { UsersCollection } from './Users/UsersCollection';
import { ChatsCollection } from './Chats/ChatsCollection';
import { MessagesCollection } from './Messages/MessagesCollection';
import { normalize } from 'normalizr';
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

        Object.keys(entitiesCollection).forEach((id) => {
          const collection = store[nameCollection];
          const value = entitiesCollection[id];
          if (collection.has(id)) {
            collection.update(id, value);
          } else collection.add(id, value);
        });
      });
    },
    normalize(data, schema) {
      const { entities, result } = normalize(data, schema);
      getRoot(store).entities.merge(entities);
      return result;
    },
  }));
