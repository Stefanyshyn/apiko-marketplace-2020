import React from 'react';

import s from './Error.module.scss';

const ErrorForm = ({ children, style, ...props }) => {
  return (
    <div
      {...props}
      style={{
        background: '#F0F0F0',
        borderRadius: '10px',
        padding: '10px 5px',
        ...style,
      }}
      className={s.errorForm}
    >
      {children}
    </div>
  );
};

export default ErrorForm;
