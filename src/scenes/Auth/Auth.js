import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login/Login';
import Register from './Register/Register';

import API from '../../service/api';

export const routes = {
  home: '/',
  login: '/auth/login',
  signUp: '/auth/sign-up',
};

const Auth = () => {
  API.auth.init();
  return (
    <Switch>
      {API.auth.isLoogedIn && <Redirect to={routes.home} />}
      <Route exact path={routes.login} component={Login} />
      <Route exact path={routes.signUp} component={Register} />
      <Route render={() => <Redirect to={routes.login} />} />
    </Switch>
  );
};

export default Auth;
