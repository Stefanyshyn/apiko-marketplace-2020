/* eslint-disable react/react-in-jsx-scope */
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routes } from '../../../scenes/router';
import {
  LoginActions,
  LoginOperations,
} from '../../../models/auth/login';
import confirm from 'reactstrap-confirm';
import LoginFormComponent from './LoginFormComponent';
import { toast } from 'react-toastify';

const mapStateToProps = (state, props) => {
  return {
    ...state.auth.login,
  };
};

const mapDispatchToProps = {
  changeEmail: LoginActions.changeEmail,
  changePassword: LoginActions.changePassword,
  reset: LoginActions.reset,
  login: LoginOperations.login,
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: (props) => async (body) => {
      try {
        await props.login(body);
        props.history.push(routes.home);
        toast.success('Login Successful');
      } catch (err) {}
    },
    handleReset: (props) => async (resetForm) => {
      let result = await confirm({
        message: 'Reset?',
        confirmText: 'Confirm',
        confirmColor: 'warning',
        cancelColor: 'link text-danger',
      });
      if (result) {
        props.reset();
        resetForm();
      }
    },
  }),
);
export default enhance(LoginFormComponent);
