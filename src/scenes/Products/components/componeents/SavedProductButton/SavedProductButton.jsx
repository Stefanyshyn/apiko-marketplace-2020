import React from 'react';
import { observer } from 'mobx-react';
import s from './SavedProductButton.module.scss';
import Icon from '../../../../../atom/Icon/Icon';

const SavedProductButton = ({ isSaved, save, unsave }) => {
  function onSave(event) {
    event.stopPropagation();
    if (typeof save === 'function') save();
  }
  function onDeleteSaved(event) {
    event.stopPropagation();
    if (typeof unsave === 'function') unsave();
  }
  return (
    <div
      className={s.container}
      onClick={isSaved ? onDeleteSaved : onSave}
    >
      {isSaved ? (
        <Icon name="greenHeart" width="17px" height="15px"></Icon>
      ) : (
        <Icon name="heart" width="17px" height="15px"></Icon>
      )}
    </div>
  );
};

export default observer(SavedProductButton);
