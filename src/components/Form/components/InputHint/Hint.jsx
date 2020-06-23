import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './InputHint.module.scss';
import Icon from '../../../../atom/Icon/Icon';

function Hint({ hint, onClick }) {
  return (
    <div className={s.hint} onClick={onClick}>
      <Icon name="hintSearch" width="15.55px" height="15.55px" />
      <div className={s.hintText}>{hint}</div>
    </div>
  );
}
export default Hint;
