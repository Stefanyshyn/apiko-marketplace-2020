import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './InputHint.module.scss';
import Hint from './Hint';

const InputHintView = ({ hints, setField, clearHints }) => {
  if (hints.length === 0) return '';
  return (
    <div className={s.inputHint}>
      <div className={s.header}>
        <div className={s.left}>Recent searches</div>
        <div className={s.right} onClick={clearHints}>
          Clear All
        </div>
      </div>
      {hints.map((hint) => {
        return (
          <Hint key={hint} onClick={setField(hint)} hint={hint} />
        );
      })}
    </div>
  );
};

export default InputHintView;
