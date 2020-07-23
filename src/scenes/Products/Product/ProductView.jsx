import React, { useEffect } from 'react';
import s from './Product.module.scss';
import { useRouteMatch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useProductsCollection } from '../../../stores/Products/ProductsCollection';
import ProductExpandView from '../../../components/Product/ProductExpand/ProductExpandContainer';

const Product = () => {
  const { params } = useRouteMatch();

  const products = useProductsCollection();

  const product = products.get(params.id);

  useEffect(() => {
    if (!product || !product.owner)
      products.fetchProduct.run(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (products.fetchProduct.isLoading)
    return <div className={s.container}>Loading...</div>;
  if (!product) return <div className={s.container}>no found</div>;
  return (
    <div className={s.container}>
      <ProductExpandView></ProductExpandView>
    </div>
  );
};

export default observer(Product);
