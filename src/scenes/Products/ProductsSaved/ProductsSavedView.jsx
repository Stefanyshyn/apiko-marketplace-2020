import React from 'react';
import s from './/ProductsSaved.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductList from '../../../components/Product/ProductList/ProductListContainer';

const ProductsSavedView = ({
  products,
  hasNextProducts,
  isNextProductsLoading,
  loadNextProduct,
}) => {
  return (
    <div className={s.container}>
      {products.length !== 0 ? (
        <ProductList
          products={products}
          hasNextProducts={hasNextProducts}
          isNextProductsLoading={isNextProductsLoading}
          loadNextProduct={loadNextProduct}
        />
      ) : (
        ''
      )}

      {isNextProductsLoading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <div className={s.emptyMsg}>
          <div className={s.emptyTitle}>Nothing found</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProductsSavedView;
