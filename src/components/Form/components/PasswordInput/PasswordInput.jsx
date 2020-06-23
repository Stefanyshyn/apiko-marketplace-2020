import React, { useState } from 'react';
import s from './PasswordInput.module.scss';

import Icon from '../../../../atom/Icon/Icon';

const PasswordInput = ({ field, name, label, ...props }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className={s.container}>
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
      <div className={s.inputWrapper}>
        <input
          id={name}
          className={s.input}
          {...field}
          {...props}
          type={isShowPassword ? 'text' : 'password'}
        />
        <div className={s.icon}>
          <Icon
            name="eye"
            size="23px"
            onClick={() => setIsShowPassword((s) => !isShowPassword)}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
