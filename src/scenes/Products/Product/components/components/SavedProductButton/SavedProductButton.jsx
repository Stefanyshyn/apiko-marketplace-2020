import React from 'react';
import { observer } from 'mobx-react';
import s from './SavedProductButton.module.scss';
import Icon from '../../../../../../atom/Icon/Icon';

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
    <div onClick={isSaved ? onDeleteSaved : onSave}>
      {isSaved ? (
        <div className={s.noSavedProduct}>
          <Icon name="greenHeart" width="17px" height="15px" />
          <div className={s.titleSave}>
            <div className={s.titleBtnSave}>Delete from favorive</div>
          </div>
        </div>
      ) : (
        <div className={s.savedProduct}>
          <Icon name="heart" width="17px" height="15px" />
          <div className={s.titleUnsave}>Add to favorive</div>
        </div>
      )}
    </div>
  );
};

export default observer(SavedProductButton);
