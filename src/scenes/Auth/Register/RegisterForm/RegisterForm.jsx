import React, { useCallback } from 'react';
import style from './RegisterForm.module.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import confirm from 'reactstrap-confirm';

import Y from '../../../../utils/yup';
import SubmiButton from '../../../../components/SubmiButton/SubmiButton';
import { useStore } from '../../../../stores/createStore';
import { routes } from '../../../router';
import Input from '../../../../components/Form/components/Input/Input';
import ErrorInput from '../../../../components/Form/components/Error/ErrorInput';
import PasswordInput from '../../../../components/Form/components/PasswordInput/PasswordInput';
import ErrorForm from '../../../../components/Form/components/Error/ErrorForm';

const RegisterForm = () => {
  const register = useStore((store) => store.auth.register);
  const history = useHistory();
  const onSubmit = useCallback(async () => {
    await register.registerFlow.run();
    if (!register.registerFlow.isError) {
      history.push(routes.signUp);
      toast.success('Register Successful');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = async (resetForm) => {
    let result = await confirm({
      message: 'Reset?',
      confirmText: 'Confirm',
      confirmColor: 'warning',
      cancelColor: 'link text-danger',
    });
    if (result) {
      register.reset();
      resetForm();
    }
  };
  const { registerFlow } = register;
  return (
    <Formik
      initialValues={{
        email: register.email,
        fullname: register.fullname,
        password: register.password,
        repeatPassword: '',
      }}
      enableReinitialize={true}
      validationSchema={Y.object({
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
      })}
      onSubmit={onSubmit}
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
                  register.setEmail(event.target.value);
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
                  register.setFullname(event.target.value);
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
                  register.setPassword(event.target.value);
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
          {registerFlow.isError ? (
            <ErrorForm>
              {registerFlow.err[0]?.toUpperCase() |
                ('' + registerFlow.err.slice(1))}
            </ErrorForm>
          ) : (
            ''
          )}
          <SubmiButton
            style={{ marginTop: '16px' }}
            isLoading={registerFlow.isLoading}
            value="Continue"
          />
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
