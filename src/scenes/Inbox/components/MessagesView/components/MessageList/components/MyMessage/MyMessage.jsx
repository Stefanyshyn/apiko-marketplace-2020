import React from 'react';
import s from './MyMessage.module.scss';
import moment from 'moment';
// import Loader from 'react-loader-spinner';
import { observer } from 'mobx-react';

const MyMessage = ({ message }) => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.messageWrapper}>
          {/* {message.isLoading ? (
            <Loader
              type="Watch"
              color="#349A89"
              height={22}
              width={22}
            />
          ) : (
            ''
          )} */}
          <span className={s.message}>{message.text}</span>
        </div>
        <div className={s.timeSend}>
          {moment(message.updatedAt).toNow()}
        </div>
      </div>

      {/* {sendMessage.isError ? (
        <Icon name="error" height="22px" width="22px" />
      ) : (
        ''
      )} */}
    </div>
  );
};

export default observer(MyMessage);
