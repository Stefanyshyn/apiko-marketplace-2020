import React, { useCallback, useEffect } from 'react';
import s from './ProductsWanted.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductList from '../../../components/Product/ProductList/ProductListView';
import SortForm from '../../../components/Search/SortForm/SortFormView';
import { useWantedProductStore } from '../../../stores/Products/WantedProductsStore';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

const ProductsWanted = () => {
  const params = useParams();
  const wantedProduct = useWantedProductStore();

  useEffect(() => {
    if (!wantedProduct.fetch.isLoading)
      wantedProduct.fetch.run({
        keywords: params.keywords,
        location: params.location,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreItems = useCallback(async () => {
    let body = {};
    if (params.keywords) body.keywords = params.keywords;
    if (params.location) body.location = params.location;

    if (params.priceFrom) body.priceFrom = params.priceFrom;

    if (params.priceTo) body.priceTo = params.priceTo;

    wantedProduct.fetchMore.run(body);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const isNextProductsLoading =
    wantedProduct.fetch.isLoading ||
    wantedProduct.fetchMore.isLoading;
  const products = wantedProduct.items;

  return (
    <div className={s.container}>
      <SortForm />
      {products.length !== 0 ? (
        <ProductList
          products={products}
          // hasNextProducts={hasNextProducts}
          hasNextProducts={wantedProduct.isNext}
          isNextProductsLoading={isNextProductsLoading}
          loadNextProduct={loadMoreItems}
        />
      ) : (
        ''
      )}
      {isNextProductsLoading ? (
        <Spinner />
      ) : products?.length === 0 ? (
        <div className={s.emptyMsg}>
          <div className={s.emptyTitle}>Nothing found</div>
          <div className={s.emptyDescribe}>
            Try other keywords or select search movies
          </div>
        </div>
      ) : wantedProduct.isNext ? (
        <div className={s.more} onClick={loadMoreItems}>
          More
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default observer(ProductsWanted);
