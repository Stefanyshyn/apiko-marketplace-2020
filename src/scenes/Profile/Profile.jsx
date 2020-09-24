import React, { useEffect, useState } from 'react';
import { Spinner, Media } from 'reactstrap';

import s from './Profile.module.scss';
import MainHeader from '../../components/Headers/MainHeader/MainHeader';
import Footer from '../../components/Footer/Footer';

import SearchForm from '../../components/Search/SearchForm/SearchFormView';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Tab from '../../components/Tab/Tab';
import Avatar from '../../components/Avatar/Avatar';
import { observer } from 'mobx-react';
import { useUsersCollection } from '../../stores/Users/UsersCollection';
import OwnProducts from './components/OwnProducts';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(3);
  const {
    params: { id },
  } = useRouteMatch();
  const users = useUsersCollection();
  const user = users.get(id);
  const fetchUser = users.fetchById;
  const match = useRouteMatch();
  useEffect(() => {
    if (!user) {
      users.fetchById.run(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = (number) => (event) => {
    setActiveTab(number);
  };
  return (
    <div className={s.container}>
      <MainHeader isSell={true}>
        <SearchForm></SearchForm>
      </MainHeader>
      <div className={s.content}>
        <div className={s.containerProfile}>
          {fetchUser.isLoading || !user ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <div className={s.avatar}>
                <Avatar
                  type="circle"
                  src={user.avatar}
                  width="95px"
                  height="95px"
                  alt={user.fullName}
                />
                <Media src={user.avatar} alt="avatar" />
              </div>
              <div className={s.fullName}>{user.fullName}</div>{' '}
              <div className={s.location}>{user.location}</div>
            </React.Fragment>
          )}
        </div>
        <div className={s.tabs}>
          <Tab active={activeTab === 1} onClick={onClick(1)}>
            <div
              className={s.feedbackProgress}
              style={{ color: '#088' }}
            >
              88%
            </div>
            <div className={s.feedbackLabel}>Positive feedback</div>
          </Tab>
          <Tab active={activeTab === 2} onClick={onClick(2)}>
            <div className={s.salecCount} style={{ color: '#088' }}>
              123
            </div>
            <div className={s.sales}>Sales</div>
          </Tab>
          <Tab active={activeTab === 3} onClick={onClick(3)}>
            <div
              className={s.listingsCount}
              style={{ color: '#088' }}
            >
              {user?.ownProducts?.items?.length || 0}
            </div>
            <div className={s.activeListings}>Active listings</div>
          </Tab>
        </div>
        <Switch>
          <Route
            path={`${match.url}/feedback`}
            render={(props) => <div>feedback</div>}
          ></Route>
          <Route
            path={`${match.url}`}
            render={(props) => {
              return <OwnProducts user={user} />;
            }}
          ></Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Profile);
