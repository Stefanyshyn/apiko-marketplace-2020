import React from 'react';

import s from './BriefProductInfo.module.scss';
import { Media } from 'reactstrap';
import Icon from '../../../../atom/Icon/Icon';
import { isValid } from '../../../../utils/url';
import { useHistory, generatePath } from 'react-router-dom';
import { routes } from '../../../router';
import SavedProductButton from '../componeents/SavedProductButton/SavedProductButton';
import { observer } from 'mobx-react';

const BriefProductInfo = ({ product }) => {
  const history = useHistory();

  function clickOnProduct() {
    history.push(generatePath(routes.product, { id: product.id }));
  }
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
        <SavedProductButton
          isSaved={product.saved}
          save={product.save.run}
          unsave={product.save.run}
        />
      </div>
      <div className={s.title}>{product.title}</div>
      <div className={s.price}>{product.price}</div>
    </div>
  );
};

export default observer(BriefProductInfo);
