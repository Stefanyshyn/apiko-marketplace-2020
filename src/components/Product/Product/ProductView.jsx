import React from 'react';

import s from '../Product.module.scss';
import { Media } from 'reactstrap';
import Icon from '../../../atom/Icon/Icon';
import { isValid } from '../../../utils/url';

const ProductView = ({
  product,
  onSave,
  onDeleteSaved,
  clickOnProduct,
}) => {
  return (
    <div className={s.container} onClick={clickOnProduct}>
      <div className={s.iconWrapper}>
        {!product.photos ||
        product.photos.length === 0 ||
        product.photos[0] === '' ||
        !isValid(product.photos[0]) ? (
          <Icon width="202px" height="148px" name="kitten" />
        ) : (
          <Media
            className={s.icon}
            src={product.photos[0]}
            alt="Photo"
          />
        )}
        <div className={s.saveWrapper}>
          {product.saved ? (
            <Icon
              name="greenHeart"
              onClick={onDeleteSaved}
              width="17px"
              height="15px"
            ></Icon>
          ) : (
            <Icon
              name="heart"
              onClick={onSave}
              width="17px"
              height="15px"
            ></Icon>
          )}
        </div>
      </div>
      <div className={s.title}>{product.title}</div>
      <div className={s.price}>{product.price}</div>
    </div>
  );
};

export default ProductView;
