import { types } from 'mobx-state-tree';
import { ProductsCollection } from './Products/ProductsCollection';
import { UsersCollection } from './Users/UsersCollection';

export const EntitiesStore = types
  .model('EntitiesStore', {
    products: ProductsCollection,
    users: UsersCollection,
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
