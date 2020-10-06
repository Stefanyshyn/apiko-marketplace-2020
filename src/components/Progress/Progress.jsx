import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Progress.module.scss';
import { useStore } from '../../stores/createStore';
import { observer } from 'mobx-react';
import { ProgressBar } from 'react-bootstrap';
const Progress = () => {
  const { isLoadingProgressBar } = useStore((store) => store.app);

  return (
    <div>
      {isLoadingProgressBar ? (
        <div className={s.progress}>
          <ProgressBar animated variant="info" now={100} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default observer(Progress);
