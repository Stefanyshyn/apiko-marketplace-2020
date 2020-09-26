import React from 'react';
import s from '../InputImages.module.scss';
import { Media } from 'reactstrap';
import DeleteButton from './DeleteButton';
function Image({ photo, onDeleteImage }) {
  return (
    <div className={s.button}>
      <DeleteButton onClick={onDeleteImage} />
      <div className={s.photo}>
        <Media src={photo} alt="photo" />
      </div>
    </div>
  );
}

export default Image;
