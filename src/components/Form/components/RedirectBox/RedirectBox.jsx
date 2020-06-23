import React from 'react';
import s from './RedirectBox.module.scss';
import { Link } from 'react-router-dom';

const RedirectBox = ({
  field,
  name,
  width,
  label,
  text,
  refText,
  route,
  ...props
}) => {
  return (
    <div
      className={s.container}
      style={{
        width: width ? width : '100%',
      }}
    >
      <div className={s.text}>
        {text}
        <Link to={route} className={s.ref}>
          {refText}
        </Link>
      </div>
    </div>
  );
};

export default RedirectBox;
