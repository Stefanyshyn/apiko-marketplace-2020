import React from 'react';
import style from './EditProfile.module.scss';
import { Formik } from 'formik';
import * as Y from 'yup';
import ErrorInput from '../components/Error/ErrorInput';
import Input from '../components/Input/Input';
import ErrorForm from '../components/Error/ErrorForm';
import Icon from '../../../atom/Icon/Icon';
import SubmiButton from '../../SubmiButton/SubmiButton';
import Spinner from '../../Spinner/Spinner';

const EditProfileComponent = (props) => {
  const {
    onSubmit,
    onUpdatePhoto,

    user,

    fetchViewer,
  } = props;

  if (fetchViewer.isLoading && !user) return <Spinner />;

  return (
    <Formik
      initialValues={{
        avatar: user.avatar,
        newAvatar: null,
        fullName: user.fullName,
        phone: user.phone || '',
      }}
      validationSchema={Y.object({
        avatar: Y.string(),
        fullName: Y.string()
          .max(50, 'Full name is too long!!')
          .required('Required'),
        phone: Y.string().max(20, 'Phone is too long!!'),
      })}
      onSubmit={(values) => {
        const body = {
          avatar: values.newAvatar || values.avatar,
          fullName: values.fullName || null,
          phone: values.phone || null,
          location: user.location,
        };
        onSubmit(body);
      }}
    >
      {(formik) => (
        <form
          className={style.container}
          onSubmit={(e) => {
            formik.handleSubmit(e);
          }}
        >
          <div className={style.title}>Edit profile</div>

          <div className={style.avatarWrapper}>
            {formik.values.avatar ? (
              <div className={style.avatar}>
                <img src={formik.values.avatar} alt="avatar" />
              </div>
            ) : (
              <Icon
                className={style.avatar}
                name="noAvatar"
                size="120px"
              />
            )}
            <button
              className={style.upload}
              onClick={onUpdatePhoto(
                formik.setFieldValue.bind(null),
                formik.setTouched.bind(null),
              )}
            >
              Upgrade Photo
            </button>
          </div>

          <div className={style.wrapInputs}>
            <div className={style.fullName}>
              <Input
                name="fullName"
                label="full name"
                placeholder="Tony Stark"
                field={formik.getFieldProps('fullName')}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <ErrorInput msg={formik.errors.fullName} />
              ) : null}
            </div>
            <div className={style.phone}>
              <Input
                name="phone"
                label="Phone number"
                type="number"
                placeholder="+380 95 641 111"
                field={formik.getFieldProps('phone')}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <ErrorInput msg={formik.errors.phone} />
              ) : null}
            </div>
            {fetchViewer.isError ? (
              <ErrorForm>
                {(
                  String(fetchViewer.error.message)[0] + ''
                ).toUpperCase() +
                  String(fetchViewer.error.message).slice(1)}
              </ErrorForm>
            ) : (
              ''
            )}
            <SubmiButton
              disabled={Object.keys(formik.touched).length === 0}
              isLoading={fetchViewer.isLoading}
              value="Continue"
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditProfileComponent;
