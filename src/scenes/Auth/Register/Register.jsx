import React from 'react';
import s from './Register.module.scss';
import Footer from '../../../components/Footer/Footer';
import AuthHeader from '../../../components/Headers/AuthHeader/AuthHeader';
import RegisterFrom from '../../../components/Form/RegisterForm/RegisterFormContainer';
import RedirectBox from '../../../components/Form/components/RedirectBox/RedirectBox';
import { routes } from '../../router';

const Register = ({ history }) => {
  return (
    <div className={s.container}>
      <AuthHeader isLoginForm={false} />
      <div className={s.content}>
        <RegisterFrom history={history} />
        <RedirectBox
          width="40%"
          text="I already have an account,"
          refText="LOG IN"
          route={routes.login}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
