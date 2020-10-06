import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './InputHint.module.scss';
import Hint from './Hint';
import { inputHints } from '../../../../service/localStorage';
import { useState } from 'react';
import { useCallback } from 'react';

const InputHint = ({ onClose, setFieldKeywords, nameHistory }) => {
  const [hints, setHints] = useState([]);
  useEffect(() => {
    let hints = inputHints.getHints({ nameHistory });
    //remove dublicate from array
    hints = [...new Set(hints)];
    hints = hints.filter((hint) => String(hint).trim());
    hints = hints.slice(0, 6);

    setHints((_hints) => hints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearHints = useCallback(() => {
    inputHints.clearHints({ nameHistory });

    setHints((_hints) => []);
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = useCallback(
    (hint) => () => {
      setFieldKeywords(hint);
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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

export default InputHint;
