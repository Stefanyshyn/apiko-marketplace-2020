import React from 'react';
import s from './ProductsLatest.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductList from '../../../components/Product/ProductList/ProductListContainer';

const ProductsLatestView = ({
  products,
  hasNextProducts,
  isNextProductsLoading,
  loadNextProduct,
}) => {
  const loadMoreItems = isNextProductsLoading
    ? () => {}
    : loadNextProduct;
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
          <div className={s.emptyDescribe}>
            Try other keywords or select search movies
          </div>
        </div>
      ) : (
        <div className={s.more} onClick={loadMoreItems}>
          More
        </div>
      )}
    </div>
  );
};

export default ProductsLatestView;
