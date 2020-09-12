import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';
import Modal from 'react-modal';
import s from './ProductInfo.module.scss';
import { Media } from 'reactstrap';
import Icon from '../../../../../atom/Icon/Icon';
import { isValid } from '../../../../../utils/url';
import OwnerInfo from '../OwnerInfo/OwnerInfo';
import ContactSellerModalView from '../../../../../components/Modal/ContactSeller/ContactSellerView';
import NoAuth from '../../../../../components/Modal/components/NoAuth';
import { useViewer } from '../../../../../stores/ViewerStore';

Modal.setAppElement('#root');

const styleModal = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.37)',
  },
  content: {
    background: '#FFFFFF',
    boxShadow: ' 0px 2px 42px rgba(0, 0, 0, 0.111233)',
    borderRadius: '7px',
    padding: '0 !important',
  },
};

const ProductInfo = ({
  product,
  isModalOpen,
  setModalOpen,
  isSaved,
  onSave,
  onDeleteSaved,
}) => {
  const owner = product.owner;
  const viewer = useViewer();

  return (
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
              $
              {product.price < 0 ? product.price * -1 : product.price}
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
      <OwnerInfo product={product} />
    </div>
  );
};

export default observer(ProductInfo);
