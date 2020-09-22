import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';

import s from './SendMessage.module.scss';

const SendMessage = ({ chat }) => {
  const [text, setText] = useState('');
  const onChange = useCallback((event) => {
    setText(event.target.value);
  }, []);
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    
    chat.sendMessage.run(text.trim());

    setText('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  const disabled = text.trim().length === 0;
  return (
    <form className={s.sendWrapper} onSubmit={onSubmit}>
      <textarea
        placeholder="Type your message here.."
        value={text}
        onChange={onChange}
      />
      <button
        type="submit"
        disabled={disabled ? 'disabled' : ''}
        style={{ opacity: disabled ? '0.7' : '1' }}
      >
        SEND
      </button>
    </form>
  );
};

export default observer(SendMessage);
