import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Login from './Login/Login';
import Register from './Register/Register';

import { routes, PrivateRoute } from '../router';

const Auth = () => {
  return (
    <Switch>
      <PrivateRoute exact path={routes.login} component={Login} />
      <PrivateRoute exact path={routes.signUp} component={Register} />
      <PrivateRoute render={() => <Redirect to={routes.login} />} />
    </Switch>
  );
};

export default Auth;
