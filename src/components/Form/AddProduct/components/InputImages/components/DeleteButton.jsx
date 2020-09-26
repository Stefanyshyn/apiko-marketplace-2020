import React from 'react';
import s from '../InputImages.module.scss';
import Icon from '../../../../../../atom/Icon/Icon';
function DeleteButton({ onClick }) {
  return (
    <div className={s.close} onClick={onClick}>
      <Icon name="close" width="28px" height="28px" />
    </div>
  );
}

export default DeleteButton;
