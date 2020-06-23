import React from 'react';

import s from './SendMessage.module.scss';

const SendMessageView = ({ text, onChange, sendMessage }) => {
  const disabled = text.trim().length === 0;
  return (
    <form className={s.sendWrapper} onSubmit={sendMessage}>
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

export default SendMessageView;
