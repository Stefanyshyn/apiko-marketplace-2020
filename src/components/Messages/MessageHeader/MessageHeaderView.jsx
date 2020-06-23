import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './MessageHeader.module.scss';
import Avatar from '../../Avatar/Avatar';
import Icon from '../../../atom/Icon/Icon';

import { Spinner } from 'reactstrap';

const MessageHeader = ({ user, product }) => {
  return (
    <div className={s.container}>
      {' '}
      {user ? (
        <div className={s.userContainer}>
          <Avatar
            classWrapper={s.avatar}
            src={user.avatar}
            alt={user.fullName}
            width="45px"
            type="circle"
          />
          <div className={s.fullName}>{user.fullName}</div>
        </div>
      ) : (
        <Spinner />
      )}
      {product ? (
        <div className={s.productContainer}>
          <Avatar
            src={
              product?.photos?.length > 0 ? product?.photos[0] : ''
            }
            alt={product.title}
            width="41px"
          />
          <div className={s.infoProduct}>
            <div className={s.title}>{product.title}</div>
            <div className={s.price}>${product.price}</div>
          </div>
          <div className={s.shared}>
            <Icon name="shared" width="18px" height="18px"></Icon>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MessageHeader;
