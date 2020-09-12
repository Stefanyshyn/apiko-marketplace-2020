import React from 'react';
import s from './Select.module.scss';
import Icon from '../../../../atom/Icon/Icon';
import {
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';

const Select = () => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle className={s.dropdown}>
        <div className={s.left}>
          <Icon name="category" width="17px" height="17px" />
          <div className={s.category}> Choose Category</div>
        </div>
        <div className={s.right}>
          <Icon name="arrowDown" width="15.99px" height="9px" />
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Cat</DropdownItem>
        <DropdownItem>Clothes</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Select;
