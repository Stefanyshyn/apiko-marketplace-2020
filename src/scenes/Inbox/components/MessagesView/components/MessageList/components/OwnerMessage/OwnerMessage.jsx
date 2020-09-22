import React from 'react';

import s from './OwnerMessage.module.scss';
import moment from 'moment';
import { observer } from 'mobx-react';

const OwnerMessage = ({ message, ...props }) => {
  return (
    <div className={s.container} {...props}>
      <div className={s.content}>
        <div className={s.messageWrapper}>
          <span className={s.message}>{message.text}</span>
        </div>
        <div className={s.timeSend}>
          {moment(message.updatedAt).toNow()}
        </div>
      </div>
    </div>
  );
};

export default observer(OwnerMessage);
