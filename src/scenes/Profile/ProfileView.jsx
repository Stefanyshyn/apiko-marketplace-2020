import React, { useState } from 'react';
import { Spinner, Media } from 'reactstrap';

import s from './Profile.module.scss';
import MainHeader from '../../components/Headers/MainHeader/MainHeaderContainer';
import Footer from '../../components/Footer/Footer';

import SearchForm from '../../components/Search/SearchForm/SearchFormContainer';
import { Switch, Route } from 'react-router-dom';
import Tab from '../../components/Tab/Tab';
import ProductsList from '../../components/Product/ProductList/ProductListContainer';
import Avatar from '../../components/Avatar/Avatar';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/createStore';

const Profile = ({
  user,
  products,
  onClickLogo,
  isProductsLoading,
  fetchUser,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(3);

  const onClick = (number) => (event) => {
    setActiveTab(number);
  };
  if (fetchUser.isLoading || !user) return <Spinner />;
  return (
    <div className={s.container}>
      <MainHeader isSell={true}>
        <SearchForm></SearchForm>
      </MainHeader>
      <div className={s.content}>
        <div className={s.containerProfile}>
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
              {products.length}
            </div>
            <div className={s.activeListings}>Active listings</div>
          </Tab>
        </div>
        <Switch>
          <Route
            path={`${props.match.path}/feedback`}
            render={(props) => <div>feedback</div>}
          ></Route>
          <Route
            path={`${props.match.path}`}
            render={(props) => {
              if (products && products.length)
                return <ProductsList products={products} />;
              if (products && products.length === 0)
                return <div className={s.empty}>Empty</div>;
              return <Spinner />;
            }}
          ></Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Profile);
