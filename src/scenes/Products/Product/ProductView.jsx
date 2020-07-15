import React, { useEffect } from 'react';
import s from './Product.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductExpand from '../../../components/Product/ProductExpand/ProductExpandContainer';
import { useRouteMatch } from 'react-router-dom';
import { useStore } from '../../../stores/createStore';
import { observer } from 'mobx-react';

const Product = () => {
  const { params } = useRouteMatch();

  const store = useStore();

  const product = store.entities.products.collection.get(params.id);

  useEffect(() => {
    if (!product) store.entities.products.fetchProduct.run(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product) return <div className={s.container}>no found</div>;
  return <div className={s.container}>{product.title}</div>;
};

export default observer(Product);
