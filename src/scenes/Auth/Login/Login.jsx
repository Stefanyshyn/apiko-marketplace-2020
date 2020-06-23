import React from 'react';
import s from './Login.module.scss';
import Footer from '../../../components/Footer/Footer';
import AuthHeader from '../../../components/Headers/AuthHeader/AuthHeader';
import LoginForm from '../../../components/Form/LoginForm/LoginFormContainer';
import RedirectBox from '../../../components/Form/components/RedirectBox/RedirectBox';
import { routes } from '../../router';

const Login = ({ history }) => {
  return (
    <div className={s.container}>
      <AuthHeader isLoginForm={true} />
      <div className={s.content}>
        <LoginForm history={history} />
        <RedirectBox
          width="40%"
          text="I have no account,"
          refText="REGISTER NOW"
          route={routes.signUp}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
