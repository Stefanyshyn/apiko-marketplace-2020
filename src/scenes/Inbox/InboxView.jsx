import React, { Fragment } from 'react';
import s from './Inbox.module.scss';
import { Redirect } from 'react-router-dom';

import MainHeader from '../../components/Headers/MainHeader/MainHeaderView';
import Footer from '../../components/Footer/Footer';
import ChatList from '../../components/Chats/ChatList/ChatListContainer';
import MessageList from '../../components/Messages/MessageList/MessageListContainer';
import { routes } from '../router';
import Spinner from '../../components/Spinner/Spinner';
import SendMessage from '../../components/Messages/SendMessage/SendMessageContainer';
import MessageHeader from '../../components/Messages/MessageHeader/MessageHeaderContainer';

const InboxView = ({
  fetchApp,
  viewer,
  chats,
  fetchChats,
  ...props
}) => {
  if (fetchApp.isLoading) return <Spinner />;
  if (fetchApp.isError) return <Redirect to={routes.login} />;
  if (!viewer) return <Redirect to={routes.login} />;

  const chatId = props?.match?.params?.chatId;
  return (
    <div className={s.container}>
      <MainHeader isSell={true} />
      <div className={s.content}>
        <aside>
          <ChatList
            chats={chats}
            chatId={props.match.params.chatId}
          />
        </aside>
        <main>
          {chatId && !fetchChats.isLoading ? (
            <Fragment>
              <MessageHeader chatId={props.match.params.chatId} />
              <MessageList key={props.match.params.chatId} />
              <SendMessage chatId={props.match.params.chatId} />
            </Fragment>
          ) : (
            'Please select a chat to start messaging'
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default InboxView;
