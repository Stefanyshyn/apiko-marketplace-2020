import React from 'react';
import { observer } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './SortForm.module.scss';

import Icon from '../../../atom/Icon/Icon';
import Select from '../components/Select/Select';
import { useWantedProductStore } from '../../../stores/Products/WantedProductsStore';

const SortForm = () => {
  const wantedProducts = useWantedProductStore();

  return (
    <div className={s.container}>
      <Select />
      <div className={s.price}>
        <input
          className={s.priceFrom}
          value={wantedProducts.priceFrom}
          type="number"
          name="priceFrom"
          onChange={(event) =>
            wantedProducts.setPriceFrom(event.target.value)
          }
          placeholder="Price from (USD)"
        />
        <Icon
          className={s.lineIcon}
          name="arrowDown"
          width="12px"
          height="1px"
        />
        <input
          className={s.priceTo}
          value={wantedProducts.priceTo}
          name="priceTo"
          type="number"
          onChange={(event) =>
            wantedProducts.setPriceTo(event.target.value)
          }
          placeholder="Price to (USD)"
        />
      </div>
    </div>
  );
};

export default observer(SortForm);
