import React from 'react';
import style from './InputWithHistory.module.scss';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import InputHints from '../InputHint/InputHintContainer';
const InputWithHistoryView = ({
  field,
  setFieldKeywords,
  nameHistory,
  ...props
}) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle className={style.DropdownInput}>
        <input {...field} {...props} />
      </DropdownToggle>
      <DropdownMenu className={style.DropdownInputMenu}>
        <InputHints
          setFieldKeywords={setFieldKeywords}
          nameHistory={nameHistory}
        />
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default InputWithHistoryView;
