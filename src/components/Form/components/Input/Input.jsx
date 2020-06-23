import React from 'react';
import style from './Input.module.scss';

const Input = ({ field, name, label, ...props }) => {
  return (
    <div className={style.wrap}>
      <label className={style.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className={style.input}
        {...field}
        {...props}
      />
    </div>
  );
};

export default Input;
