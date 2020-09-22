import React, { useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import s from './Inbox.module.scss';
import MainHeader from '../../components/Headers/MainHeader/MainHeaderView';
import Footer from '../../components/Footer/Footer';
import ChatList from './components/ChatList/ChatList';
import { observer } from 'mobx-react';
import { routes } from '../router';
import { MessagesView } from './components/MessagesView/MessagesView';
import { useChatStore } from '../../stores/Chats/ChatStore';

const Inbox = () => {
  const { chatId } = useParams();
  const chats = useChatStore();

  useEffect(() => {
    chats.fetchChats.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.container}>
      <MainHeader isSell={true} />
      <div className={s.content}>
        <aside>
          <ChatList />
        </aside>
        <main>
          <Switch>
            <Route
              exact
              key={chats.get(+chatId)}
              path={routes.inboxChat}
              component={MessagesView}
            />
            <Route
              render={() => {
                return 'Please select a chat to start messaging';
              }}
            />
          </Switch>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Inbox);
