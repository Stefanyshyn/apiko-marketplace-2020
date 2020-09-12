import React from 'react';
import s from './Tab.module.scss';
import Icon from '../../atom/Icon/Icon';

const Tab = ({ active, onClick, children }) => {
  return (
    <React.Fragment>
      {active ? (
        <div className={s.tabActive} onClick={onClick}>
          <Icon className={s.iconActive} name="activeTab" />
          {children}
        </div>
      ) : (
        <div className={s.tab} onClick={onClick}>
          {children}
        </div>
      )}
    </React.Fragment>
  );
};

export default Tab;
