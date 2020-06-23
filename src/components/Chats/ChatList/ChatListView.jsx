import React from 'react';

import s from './ChatList.module.scss';
import Chat from '../Chat/ChatContainer';
import ActiveChat from '../ActiveChat/ActiveChatContainer';
import Spinner from '../../Spinner/Spinner';

const ChatList = ({ chats, fetchChats, chatId, ...props }) => {
  if (fetchChats.isLoading) return <Spinner />;
  if (chats.length)
    return (
      <div className={s.containerList}>
        <div className={s.wrapper}>
          {chats.map((chat) => {
            if (Number(chat.id) === Number(chatId))
              return (
                <ActiveChat
                  key={Object.entries(chat).join('')}
                  chat={chat}
                />
              );
            return (
              <Chat key={Object.entries(chat).join('')} chat={chat} />
            );
          })}
        </div>
      </div>
    );
  return (
    <div className={s.emptyMsg}>
      <div className={s.emptyTitle}>Nothing found</div>
      <div className={s.emptyDescribe}>You have no chats</div>
    </div>
  );
};

export default ChatList;
