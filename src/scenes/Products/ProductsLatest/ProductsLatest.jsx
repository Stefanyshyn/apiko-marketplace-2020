import React, { useState, useEffect, useCallback } from 'react';
import s from './ProductsLatest.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductList from '../../../components/Product/ProductList/ProductListContainer';
import { useStore } from '../../../stores/createStore';
import { observer } from 'mobx-react';
import {} from '../../../components/Spinner/Spinner';

const limit = 20;

const ProductsLatestView = ({
  hasNextProducts,
  isNextProductsLoading,
}) => {
  const [from, setFrom] = useState(undefined);

  const store = useStore();
  const products = store.latestProducts.items;

  useEffect(() => {
    store.latestProducts.fetchLatest.run({ limit, from });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  const loadNextProduct = useCallback(async () => {
    if (products?.length !== 0)
      setFrom(products[products?.length - 1].id);
    await store.latestProducts.fetchLatest({ from: from, limit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

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

export default observer(ProductsLatestView);
