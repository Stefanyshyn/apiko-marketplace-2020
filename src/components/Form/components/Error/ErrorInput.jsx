import React from 'react';

import style from './Error.module.scss';

const ErrorInput = ({ msg }) => {
  return <div className={style.errorInput}>{msg}</div>;
};

export default ErrorInput;
