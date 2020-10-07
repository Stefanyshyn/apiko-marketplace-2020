import React from 'react';
import s from './Register.module.scss';
import Footer from '../../../components/Footer/Footer';
import AuthHeader from '../../../components/Headers/AuthHeader/AuthHeader';
import RegisterFrom from './RegisterForm/RegisterForm';
import RedirectBox from '../../../components/Form/components/RedirectBox/RedirectBox';
import { routes } from '../../router';

const Register = () => {
  return (
    <div className={s.container}>
      <AuthHeader isLoginForm={false} />
      <div className={s.content}>
        <RegisterFrom />
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
