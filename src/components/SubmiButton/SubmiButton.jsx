import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './SubmiButton.module.scss';
import Spinner from '../Spinner/Spinner';
import { observer } from 'mobx-react';

const SubmiButton = ({ value, disabled, isLoading, className }) => {
  return (
    <div
      className={s.submit}
      style={disabled ? { opacity: '50%' } : null}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <input
          className={s.button + ' ' + className}
          type="submit"
          disabled={isLoading || disabled ? 'disabled' : ''}
          value={value}
        />
      )}
    </div>
  );
};

export default observer(SubmiButton);
