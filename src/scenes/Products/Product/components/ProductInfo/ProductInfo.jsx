import React, { useState } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';
import s from './ProductInfo.module.scss';
import { Media } from 'reactstrap';
import Icon from '../../../../../atom/Icon/Icon';
import { isValid } from '../../../../../utils/url';
import OwnerInfo from '../OwnerInfo/OwnerInfo';
import SavedProductButton from '../OwnerInfo/SavedProductButton/SavedProductButton';
import SendMessageModal from '../components/SendMessageModal/SendMessageModal';

const ProductInfo = ({ product }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <React.Fragment>
      <div className={s.container}>
        <div className={s.containerProduct}>
          <div className={s.iconWrapper}>
            {!product.photos ||
            product.photos.length === 0 ||
            product.photos[0] === '' ||
            !isValid(product.photos[0]) ? (
              <Icon width="100%" height="25.4vh" name="kitten" />
            ) : (
              <Media
                className={s.icon}
                src={product.photos[0]}
                alt="Photo"
              />
            )}
            <div className={s.priceWrapper}>
              <div className={s.price}>
                {product.price < 0
                  ? product.price * -1
                  : product.price}
              </div>
            </div>
          </div>

          <div className={s.titleCreateAtWrapper}>
            <div className={s.title}>{product.title}</div>
            <div className={s.createdAt}>
              {moment(product.createdAt).calendar()}
            </div>
          </div>

          <div className={s.locationWrapper}>
            <Icon width="10.8px" height="16.2px" name="location" />

            <div className={s.location}>{product.location}</div>
          </div>

          <div className={s.delimiter}></div>

          <div className={s.description}>{product.description}</div>
        </div>
        <div className={s.containerOwner}>
          <OwnerInfo product={product} />
          <div className={s.chatBtn} onClick={(e) => setOpen(true)}>
            Chat with seller
          </div>
          <SavedProductButton
            isSaved={product.saved}
            save={product.save.run}
            unsave={product.unsave.run}
          />
        </div>
      </div>

      <SendMessageModal
        product={product}
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </React.Fragment>
  );
};

export default observer(ProductInfo);
