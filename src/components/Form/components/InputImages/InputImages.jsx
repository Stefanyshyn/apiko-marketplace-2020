import React from 'react';
import s from './InputImages.module.scss';
import Icon from '../../../../atom/Icon/Icon';
import { compose, withHandlers } from 'recompose';
import { Media } from 'reactstrap';

const InputImages = ({
  field,
  name,
  label,
  photos,

  onClickAddPhoto,
  ...props
}) => {
  return (
    <div className={s.container}>
      {photos.map((photo, index) => (
        <Image key={index} photo={URL.createObjectURL(photo)} />
      ))}
      {Array.isArray(photos) && photos.length < 6 ? (
        <AddButton onClick={onClickAddPhoto(photos)} />
      ) : (
        ''
      )}
    </div>
  );
};

function Image({ photo }) {
  return (
    <div className={s.button}>
      <div className={s.photo}>
        <Media src={photo} alt="photo" />
      </div>
    </div>
  );
}
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

const enhancer = compose(
  withHandlers({
    onClickAddPhoto: (props) => (photos) => (event) => {
      event.preventDefault();
      const select = document.createElement('input');
      select.setAttribute(
        'accept',
        '.jpg,.jpeg,.png,.gif,.apng,.tiff,.tif,.bmp,.xcf,.webp,.mp4,.mov',
      );
      select.type = 'file';
      select.onchange = async (e) => {
        let file = e.target.files[0];
        props.setPhotos([...photos, file]);
      };
      select.click();
    },
  }),
);

export default enhancer(InputImages);
