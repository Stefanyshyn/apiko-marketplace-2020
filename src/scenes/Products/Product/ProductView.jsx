import React from 'react';
import s from './Product.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductExpand from '../../../components/Product/ProductExpand/ProductExpandContainer';

const Product = ({ fetchProduct, product, owner }) => {
  if (fetchProduct.isLoading || !product) return <Spinner />;
  return (
    <div className={s.container}>
      <ProductExpand product={product} owner={owner} />
    </div>
  );
};

export default Product;
