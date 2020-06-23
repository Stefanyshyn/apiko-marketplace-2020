import React from 'react';
import style from './LoginForm.module.scss';
import { Formik } from 'formik';
import * as Y from 'yup';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import ErrorInput from '../components/Error/ErrorInput';
import Input from '../components/Input/Input';
import ErrorForm from '../components/Error/ErrorForm';
import SubmiButton from '../../SubmiButton/SubmiButton';

const LoginFormComponent = (props) => {
  const {
    onSubmit,
    changeEmail,
    changePassword,

    email,
    password,

    isLoading,
    isError,
    errorMessage,
    handleReset,
  } = props;
  return (
    <Formik
      initialValues={{
        email: email,
        password: password,
      }}
      enableReinitialize={true}
      validationSchema={Y.object({
        email: Y.string()
          .email('Invalid email address')
          .required('Enter email address'),
        password: Y.string()
          .min(8, 'Password must contain at least 8 characters')
          .required('Enter password'),
      })}
      onSubmit={(values) => {
        const body = {
          email: values.email,
          password: values.password,
        };
        onSubmit(body);
      }}
    >
      {(formik) => (
        <form
          className={style.loginFormContainer}
          onSubmit={formik.handleSubmit}
        >
          <div
            className={style.loginFormTitle}
            onClick={handleReset.bind(null, formik.resetForm)}
          >
            Login
          </div>

          <div className={style.loginFormEmail}>
            <Input
              name="email"
              label="email"
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
          <div className={style.loginFormPassword}>
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
          <div className={style.loginFormForgetPassword}>
            Don't remember password?
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

export default LoginFormComponent;
