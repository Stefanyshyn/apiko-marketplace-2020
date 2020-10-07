import React, { useState } from 'react';
import style from './InputWithHistory.module.scss';
import InputHints from '../InputHint/InputHint';
import onClickOutside from 'react-onclickoutside';

const InputWithHistory = ({
  field,
  setFieldKeywords,
  nameHistory,
  placeholder,
}) => {
  const [isOpen, setOpen] = useState(false);
  InputWithHistory.handleClickOutside = () => setOpen(false);
  return (
    <div className={style.container}>
      <div className={style.DropdownInput}>
        <input
          {...field}
          placeholder={placeholder}
          className={style.searchByName}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div
        className={style.DropdownInputMenu}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        <InputHints
          filterValue={field.value.trim()}
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
