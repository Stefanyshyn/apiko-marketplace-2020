import React from 'react';
import confirm from 'reactstrap-confirm';
import style from './LoginForm.module.scss';
import { Formik } from 'formik';
import * as Y from 'yup';
import { observer } from 'mobx-react';
import PasswordInput from '../../../../../components/Form/components/PasswordInput/PasswordInput';
import ErrorInput from '../../../../../components/Form/components/Error/ErrorInput';
import Input from '../../../../../components/Form/components/Input/Input';
import ErrorForm from '../../../../../components/Form/components/Error/ErrorForm';
import SubmiButton from '../../../../../components/SubmiButton/SubmiButton';
import 'mobx-react/batchingForReactDom';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../../router';
import { useLogin } from '../../../../../stores/auth/LoginStore';

const LoginForm = function () {
  const history = useHistory();
  const login = useLogin();
  const email = login.email;
  const password = login.password;
  const { isError, isLoading } = login.loginFlow;

  const handleReset = async (resetForm) => {
    let result = await confirm({
      message: 'Reset?',
      confirmText: 'Confirm',
      confirmColor: 'warning',
      cancelColor: 'link text-danger',
    });
    if (result) {
      login.reset();
      resetForm();
    }
  };

  async function onSubmit({ email, password }) {
    await login.loginFlow.run({ email, password });
    if (isError) {
      login.reset();
      history.push(routes.home);
    }
  }
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
      onSubmit={async (values) => {
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
                  login.setEmail(event.target.value);
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
                  login.setPassword(event.target.value);
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
            <ErrorForm>Invalid email/password combination</ErrorForm>
          ) : (
            ''
          )}
          <SubmiButton
            style={{ marginTop: '16px' }}
            isLoading={isLoading}
            value="Save"
          />
        </form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
