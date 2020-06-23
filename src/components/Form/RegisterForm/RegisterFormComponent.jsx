import React from 'react';
import style from './RegisterForm.module.scss';

import { Formik } from 'formik';
import Y from '../../../utils/yup';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import ErrorInput from '../components/Error/ErrorInput';
import Input from '../components/Input/Input';
import ErrorForm from '../components/Error/ErrorForm';
import SubmiButton from '../../SubmiButton/SubmiButton';

const RegisterFormComponent = (props) => {
  const {
    onSubmit,
    changeEmail,
    changeFullName,
    changePassword,
    handleReset,

    email,
    fullName,
    password,

    isLoading,
    isError,
    errorMessage,
  } = props;

  const validationSchema = Y.object({
    email: Y.string()
      .email('Invalid email address')
      .required('Enter email address'),
    fullname: Y.string().required('Enter fullname'),
    password: Y.string()
      .min(8, 'Password must contain at least 8 characters \t')
      .required('Enter password'),
    repeatPassword: Y.string()
      .equalTo(Y.ref('password'), 'Passwords must match')
      .required('Enter repeat password'),
  });

  return (
    <Formik
      initialValues={{
        email: email,
        fullname: fullName,
        password: password,
        repeatPassword: '',
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        let body = {
          fullName: values.fullname,
          email: values.email,
          password: values.password,
        };
        onSubmit(body);
      }}
    >
      {(formik) => (
        <form
          className={style.registerFormContainer}
          onSubmit={formik.handleSubmit}
        >
          <div
            className={style.registerFormTitle}
            onClick={handleReset.bind(null, formik.resetForm)}
          >
            Register
          </div>

          <div className={style.registerFormEmail}>
            <Input
              label="email"
              name="email"
              placeholder="Example@gmail.com"
              field={{
                ...formik.getFieldProps('email'),
                onChange: (event) => {
                  changeEmail(event.target.value);
                  formik.handleChange(event);
                },
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorInput msg={formik.errors.email} />
            ) : null}
          </div>

          <div className={style.registerFormFullname}>
            <Input
              label="full name"
              name="fullname"
              placeholder="Tony Stark"
              field={{
                ...formik.getFieldProps('fullname'),
                onChange: (event) => {
                  changeFullName(event.target.value);
                  formik.handleChange(event);
                },
              }}
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <ErrorInput msg={formik.errors.fullname} />
            ) : null}
          </div>

          <div className={style.registerFormPassword}>
            <PasswordInput
              name="password"
              label="password"
              field={{
                ...formik.getFieldProps('password'),
                onChange: (event) => {
                  changePassword(event.target.value);
                  formik.handleChange(event);
                },
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorInput msg={formik.errors.password} />
            ) : null}
          </div>

          <div className={style.registerFormRepeatPassword}>
            <PasswordInput
              name="repeatPassword"
              label="password again"
              field={formik.getFieldProps('repeatPassword')}
            />
            {formik.touched.repeatPassword &&
            formik.errors.repeatPassword ? (
              <ErrorInput msg={formik.errors.repeatPassword} />
            ) : null}
          </div>
          {isError ? (
            <ErrorForm>
              {(
                errorMessage.response.data.error[0] + ''
              ).toUpperCase() +
                errorMessage.response.data.error.slice(1)}
            </ErrorForm>
          ) : (
            ''
          )}
          <SubmiButton
            style={{ marginTop: '16px' }}
            isLoading={isLoading}
            value="Continue"
          />
        </form>
      )}
    </Formik>
  );
};

export default RegisterFormComponent;
