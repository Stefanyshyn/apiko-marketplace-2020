import React, { useCallback } from 'react';
import s from './InputImages.module.scss';
import { observer } from 'mobx-react';
import AddButton from './components/AddButton';
import Image from './components/Image';

const InputImages = ({
  field,
  name,
  label,
  photos,
  setPhotos,
  onDeleteImage,
}) => {
  const onClickAddPhoto = useCallback(
    (photos) => (event) => {
      event.preventDefault();
      const select = document.createElement('input');
      select.setAttribute(
        'accept',
        '.jpg,.jpeg,.png,.gif,.apng,.tiff,.tif,.bmp,.xcf,.webp,.mp4,.mov',
      );
      select.type = 'file';
      select.onchange = async (e) => {
        let file = e.target.files[0];
        setPhotos([...photos, file]);
      };
      select.click();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className={s.container} name={name}>
      {photos.map((photo, index) => (
        <Image
          key={index}
          onDeleteImage={onDeleteImage.bind(null, index)}
          photo={URL.createObjectURL(photo)}
        />
      ))}
      {Array.isArray(photos) && photos.length < 6 ? (
        <AddButton onClick={onClickAddPhoto(photos)} />
      ) : (
        ''
      )}
    </div>
  );
};

export default observer(InputImages);
