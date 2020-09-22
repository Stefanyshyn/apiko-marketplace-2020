import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import MessageHeader from './components/MessageHeader/MessageHeader';
import MessageList from './components/MessageList/MessageList';
import SendMessage from './components/SendMessage/SendMessage';
import { useParams } from 'react-router-dom';
import Spinner from '../../../../components/Spinner/Spinner';
import { useChatStore } from '../../../../stores/Chats/ChatStore';

export function MessagesView() {
  const { chatId } = useParams();
  const chats = useChatStore();
  const chat = chats.get(+chatId);

  if (!chat) return <Spinner />;
  return (
    <Fragment>
      <MessageHeader chatId={chatId} chat={chat} />
      <MessageList key={chatId} chat={chat} />
      <SendMessage chat={chat} />
    </Fragment>
  );
}

export default observer(MessagesView);
