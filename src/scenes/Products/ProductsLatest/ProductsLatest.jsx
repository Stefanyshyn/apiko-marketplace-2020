import React, { useEffect, useCallback } from 'react';
import s from './ProductsLatest.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductList from '../../../components/Product/ProductList/ProductListView';
import { observer } from 'mobx-react';
import { useLatestProductsStore } from '../../../stores/Products/LatestProdutsStore';

function ProductsLatest() {
  const latestProducts = useLatestProductsStore();
  const products = latestProducts.items;
  const isNextProductsLoading = latestProducts.fetchLatest.isLoading;

  useEffect(() => {
    latestProducts.fetchLatest.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreItems = useCallback(async () => {
    await latestProducts.fetchLatest.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.container}>
      {products.length !== 0 ? (
        <ProductList
          products={products}
          // hasNextProducts={hasNextProducts}
          hasNextProducts={true}
          isNextProductsLoading={isNextProductsLoading}
          loadNextProduct={loadMoreItems}
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
}

export default observer(ProductsLatest);
