import React, { useState, useEffect, useCallback } from 'react';
import s from './ProductsLatest.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductList from '../../../components/Product/ProductList/ProductListView';
import { observer } from 'mobx-react';
import { useLatestProductsStore } from '../../../stores/Products/LatestProdutsStore';
import { ProgressBar } from 'react-bootstrap';
const limit = 20;

function ProductsLatest() {
  const [from, setFrom] = useState(undefined);

  const latestProducts = useLatestProductsStore();
  const products = latestProducts.items;
  const isNextProductsLoading = latestProducts.fetchLatest.isLoading;

  useEffect(() => {
    latestProducts.fetchLatest.run({ limit, from });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  const loadNextProduct = useCallback(async () => {
    if (products?.length !== 0)
      setFrom(products[products?.length - 1].id);
    await latestProducts.fetchLatest({ from: from, limit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  const loadMoreItems = isNextProductsLoading
    ? () => {}
    : loadNextProduct;

  return (
    <div className={s.container}>
      {latestProducts.isReset ? (
        <div className={s.progress}>
          <ProgressBar animated variant="info" now={100} />
        </div>
      ) : (
        ''
      )}

      {products.length !== 0 ? (
        <ProductList
          products={products}
          // hasNextProducts={hasNextProducts}
          hasNextProducts={true}
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
}

export default observer(ProductsLatest);
