import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../stores/createStore';

import Home from './Home/HomeView';
import Inbox from './Inbox/Inbox';
import NotFound from './NotFound/NotFound';
import Auth from './Auth/Auth';
import EditProfile from './EditProfile/EditProfile';
import AddProduct from './AddProduct/AddProduct';
import Profile from './Profile/Profile';
import NoAuth from '../components/Modal/components/NoAuth';

import ModalRefresh from '../components/Modal/ModalRefresh';
import AddProductForm from '../components/Form/AddProduct/AddProduct';

export const routes = {
  home: '/',
  inbox: '/inbox',
  inboxChat: '/inbox/:chatId',
  editProfile: '/profile/edit',
  auth: '/auth',
  login: '/auth/login',
  signUp: '/auth/sign-up',
  profile: '/users/profile/:id',
  product: '/products/:id',
  wantedProduct:
    '/products/wanted/keywords=:keywords?&location=:location?&priceFrom=:priceFrom?&priceTo=:priceTo?',
  addProduct: '/products/add',
  productLatest: '/products/latest',
  savedProducts: '/products/saved',
};

export const PrivateRoute = observer(
  ({ component: Component, ...props }) => {
    const store = useStore();
    return (
      <Route
        {...props}
        render={(...renderProps) =>
          store.auth.isLoggedIn ? (
            <Redirect to={routes.home} />
          ) : (
            <Component {...renderProps} />
          )
        }
      />
    );
  },
);

const Router = () => {
  const store = useStore();
  let location = useLocation();

  useEffect(() => {
    if (location.state) {
      window.history.pushState(null, '');
    }
  }, [location.state]);

  let background = location.state && location.state.background;

  return (
    <>
      <Switch location={background ? background : location}>
        <Route
          exact
          path={routes.editProfile}
          component={EditProfile}
        />
        <Route
          exact
          path={[routes.inbox, routes.inboxChat]}
          component={Inbox}
        />
        <Route
          exact
          path={routes.addProduct}
          component={AddProduct}
        />
        <Route path={routes.profile} component={Profile} />
        <PrivateRoute path={routes.auth} component={Auth} />
        <Route path={routes.home} component={Home} />
        <Route component={NotFound} />
      </Switch>
      {/*display modal window for append product*/}

      {background ? (
        <Route
          path={routes.addProduct}
          render={() => {
            return (
              <ModalRefresh isOpen={true}>
                {store.auth.isLoggedIn ? (
                  <AddProductForm />
                ) : (
                  <NoAuth />
                )}
              </ModalRefresh>
            );
          }}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default observer(Router);
