import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Avatar.module.scss';
import { Media } from 'reactstrap';
import color from '../../utils/color';
const colorAvatar = color.getRandomColor();

const Avatar = ({
  src,
  alt,
  classWrapper,
  type,
  width,
  height,
  ...props
}) => {
  let maxWidth = width ? width : height;
  let maxHeight = height ? height : width;

  const style = {
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    minWidth: maxWidth,
    minHeight: maxHeight,
    width: '100%',
    height: '100%',
    backgroundColor: colorAvatar,

    ...getType(type),
  };
  return (
    <div className={s.container + ' ' + classWrapper} style={style}>
      {src ? (
        <Media src={src} alt={alt} {...props} />
      ) : (
        String(alt).slice(0, 2).toUpperCase()
      )}
    </div>
  );
};

function getType(type) {
  switch (type) {
    case 'circle':
      return {
        borderRadius: '50%',
      };
    default:
      return {};
  }
}

export default Avatar;
