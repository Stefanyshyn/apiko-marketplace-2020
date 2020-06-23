import React from 'react';

import style from './Error.module.scss';

const ErrorForm = ({ children, ...props }) => {
  return (
    <div {...props} className={style.errorForm}>
      {children}
    </div>
  );
};

export default ErrorForm;
