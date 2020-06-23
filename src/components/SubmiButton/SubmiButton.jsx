import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './SubmiButton.module.scss';

const SubmiButton = ({
  value,
  disabled,
  height,
  isLoading,
  className,
  ...props
}) => {
  return (
    <div
      className={s.submit}
      style={disabled ? { opacity: '50%' } : null}
    >
      <input
        className={s.button + ' ' + className}
        type="submit"
        disabled={isLoading || disabled ? 'disabled' : ''}
        value={isLoading ? 'isLoading...' : value}
        {...props}
      />
    </div>
  );
};

export default SubmiButton;
