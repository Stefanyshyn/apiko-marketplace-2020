import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './SortForm.module.scss';

import Icon from '../../../atom/Icon/Icon';
import Select from '../components/Select/Select';

const SortFormView = ({ priceTo, priceFrom, onChange }) => {
  return (
    <div className={s.container}>
      <Select />
      <div className={s.price}>
        <input
          className={s.priceFrom}
          value={priceFrom}
          type="number"
          name="priceFrom"
          onChange={(event) => onChange(event)}
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
          value={priceTo}
          name="priceTo"
          type="number"
          onChange={(event) => onChange(event)}
          placeholder="Price to (USD)"
        />
      </div>
    </div>
  );
};

export default SortFormView;
