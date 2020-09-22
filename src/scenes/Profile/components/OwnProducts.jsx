import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import s from './OwnProducts.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductsList from '../../../components/Product/ProductList/ProductListView';

function OwnProducts({ user }) {
  const products = user?.ownProducts?.items;
  useEffect(() => {
    if (user) {
      user.ownProducts.fetch.run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (!products) return <Spinner />;
  if (products.length) {
    return <ProductsList products={products} />;
  }
  return <div className={s.empty}>Empty</div>;
}

export default observer(OwnProducts);
