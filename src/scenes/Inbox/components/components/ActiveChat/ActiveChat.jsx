import React, { useEffect } from 'react';

import s from './ActiveChat.module.scss';
import { Media } from 'reactstrap';
import moment from 'moment';
import Icon from '../../../../../atom/Icon/Icon';
import { isValid } from '../../../../../utils/url';
import { useProductsCollection } from '../../../../../stores/Products/ProductsCollection';
import { useUsersCollection } from '../../../../../stores/Users/UsersCollection';

const ActiveChat = ({ chat, onClickChat }) => {
  const products = useProductsCollection();
  const users = useUsersCollection();
  const user = chat.user;
  const product = chat.product;
  const fetchUser = users.fetchById;
  const owner = users.get(chat.ownerId);

  useEffect(() => {
    if (!product) {
      products.fetchProduct.run(chat.productId);
      if (!user) users.fetchById.run(chat.ownerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);
  return (
    <div className={s.container} onClick={onClickChat}>
      <div className={s.delimiterActive}></div>

      <div className={s.ownerMsgWrapper}>
        <div className={s.fullName}>
          {fetchUser.isLoading || !owner
            ? 'Loading...'
            : owner.fullName}
        </div>

        <div className={s.messageWrapper}>
          <Icon name="message" width="11px" height="11px" />
          <div className={s.message}>{chat.message.text}</div>
        </div>
      </div>

      <div className={s.delimiter}></div>

      <div className={s.productWrapper}>
        <div className={s.iconWrapper}>
          {!product.photos ||
          product.photos.length === 0 ||
          product.photos[0] === '' ||
          !isValid(product.photos[0]) ? (
            <Icon width="47px" height="47px" name="kitten" />
          ) : (
            <Media
              className={s.icon}
              src={product.photos[0]}
              alt="Photo"
            />
          )}
        </div>

        <div className={s.productInfoWrapper}>
          <div className={s.productTitle}>{product.title}</div>
          <div className={s.productPrice}>${product.price}</div>
        </div>
      </div>

      <div className={s.delimiter}></div>

      <div className={s.messageTimeSend}>
        {moment(chat.message.updatedAt).format('HH:mm')}
      </div>
    </div>
  );
};

export default ActiveChat;
