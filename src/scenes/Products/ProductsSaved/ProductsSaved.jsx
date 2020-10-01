import React, { useEffect } from 'react';
import s from './/ProductsSaved.module.scss';
import Spinner from '../../../components/Spinner/Spinner';
import ProductList from '../../../components/Product/ProductList/ProductListView';
import { observer } from 'mobx-react';
import { useSavedProductStore } from '../../../stores/Products/SavedProductStore';

const ProductsSaved = () => {
  const savedProducts = useSavedProductStore();
  useEffect(() => {
    savedProducts.fetch.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const products = [...savedProducts.items];
  return (
    <div className={s.container}>
      {products.length !== 0 ? (
        <ProductList
          products={savedProducts.items}
          isNextProductsLoading={false}
        />
      ) : (
        ''
      )}

      {savedProducts.fetch.isLoading ? (
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

export default observer(ProductsSaved);
