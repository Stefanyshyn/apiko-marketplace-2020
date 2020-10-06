import React, { useState } from 'react';
import style from './InputWithHistory.module.scss';
import InputHints from '../InputHint/InputHint';
import onClickOutside from 'react-onclickoutside';

const InputWithHistory = ({
  field,
  setFieldKeywords,
  nameHistory,
}) => {
  const [isOpen, setOpen] = useState(false);
  InputWithHistory.handleClickOutside = () => setOpen(false);
  return (
    <div className={style.container}>
      <div className={style.DropdownInput}>
        <input
          {...field}
          className={style.searchByName}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div
        className={style.DropdownInputMenu}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        <InputHints
          onClose={() => setOpen(false)}
          setFieldKeywords={setFieldKeywords}
          nameHistory={nameHistory}
        />
      </div>
    </div>
  );
};
InputWithHistory.prototype = {};
const clickOutsideConfig = {
  handleClickOutside: () => InputWithHistory.handleClickOutside,
};

export default onClickOutside(InputWithHistory, clickOutsideConfig);
