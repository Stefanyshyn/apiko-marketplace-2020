import React from 'react';
import s from '../InputImages.module.scss';
import Icon from '../../../../../../atom/Icon/Icon';

function AddButton({ onClick }) {
  return (
    <div className={s.button} onClick={onClick}>
      <Icon name="greenLine" width="38px" height="4px" />
      <div className={s.verticalLine}>
        <Icon name="greenLine" width="38px" height="4px" />
      </div>
    </div>
  );
}

export default AddButton;
