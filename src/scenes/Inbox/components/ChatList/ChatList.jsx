import React, { useCallback } from 'react';

import s from './ChatList.module.scss';
import Chat from '../components/Chat/Chat';
import ActiveChat from '../components/ActiveChat/ActiveChat';
import {
  generatePath,
  useHistory,
  useParams,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import Spinner from '../../../../components/Spinner/Spinner';
import { routes } from '../../../router';
import { useChatStore } from '../../../../stores/Chats/ChatStore';

const ChatList = () => {
  const { chatId } = useParams();
  const history = useHistory();

  const chats = useChatStore();

  const onClickChat = useCallback(
    (chatId) => () => {
      history.push(generatePath(routes.inboxChat, { chatId }));
    },
    [history],
  );

  if (!chats?.items?.length && chats?.fetchChats.isLoading)
    return <Spinner />;
  if (chats?.items?.length)
    return (
      <div className={s.containerList}>
        <div className={s.wrapper}>
          {chats.items.map((chat) => {
            if (Number(chat.id) === Number(chatId))
              return (
                <ActiveChat
                  onClickChat={onClickChat(chat.id)}
                  key={Object.entries(chat).join('')}
                  chat={chat}
                />
              );
            return (
              <Chat
                onClickChat={onClickChat(chat.id)}
                key={Object.entries(chat).join('')}
                chat={chat}
              />
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

export default observer(ChatList);
