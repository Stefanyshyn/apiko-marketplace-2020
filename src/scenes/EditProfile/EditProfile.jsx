import React from 'react';
import s from './EditProfile.module.scss';
import MainHeader from '../../components/Headers/MainHeader/MainHeaderView';
import Footer from '../../components/Footer/Footer';

import EditProfileForm from '../../components/Form/EditProfileForm/EditProfileContainer';

const EditProfile = () => {
  return (
    <div className={s.container}>
      <MainHeader />
      <div className={s.content}>
        <EditProfileForm />
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
