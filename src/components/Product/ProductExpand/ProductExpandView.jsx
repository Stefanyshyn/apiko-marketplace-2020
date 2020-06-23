import React from 'react';
import moment from 'moment';
import s from './ProductExpand.module.scss';
import { Media } from 'reactstrap';
import Icon from '../../../atom/Icon/Icon';
import { isValid } from '../../../utils/url';
import Owner from '../../User/Owner/Owner';
import Modal from 'react-modal';
import ContactSellerModalView from '../../Modal/ContactSeller/ContactSellerContainer';
import NoAuth from '../../Modal/components/NoAuth';

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

const ProductExpandView = ({
  product,
  owner,
  viewer,
  viewerId,
  isModalOpen,
  setModalOpen,
  isSaved,
  onSave,
  onDeleteSaved,
}) => {
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
      {owner ? (
        owner.id !== viewerId ? (
          <div className={s.containerOwner}>
            <Owner owner={owner} />
            <div
              className={s.chatBtn}
              onClick={(e) => setModalOpen(true)}
            >
              Chat with seller
            </div>
            {isSaved ? (
              <div
                className={s.noSavedProduct}
                onClick={onDeleteSaved}
              >
                <Icon name="greenHeart" width="17px" height="15px" />
                <div className={s.titleSave}>
                  <div className={s.titleBtnSave}>
                    {' '}
                    Delete from favorive
                  </div>
                </div>
              </div>
            ) : (
              <div className={s.savedProduct} onClick={onSave}>
                <Icon name="heart" width="17px" height="15px" />
                <div className={s.titleUnsave}>Add to favorive</div>
              </div>
            )}
          </div>
        ) : (
          ''
        )
      ) : (
        'Loading'
      )}
      <Modal
        style={styleModal}
        onRequestClose={() => setModalOpen(false)}
        isOpen={isModalOpen}
      >
        {viewer ? (
          <ContactSellerModalView
            product={product}
            owner={owner}
            onClose={setModalOpen}
          ></ContactSellerModalView>
        ) : (
          <NoAuth />
        )}
      </Modal>
    </div>
  );
};

export default ProductExpandView;
