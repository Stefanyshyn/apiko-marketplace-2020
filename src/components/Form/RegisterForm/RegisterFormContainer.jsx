import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { routes } from '../../../scenes/router';
import {
  RegisterActions,
  RegisterOperations,
} from '../../../models/auth/register';
import RegisterFormComponent from './RegisterFormComponent';
import { withRouter } from 'react-router-dom';
import confirm from 'reactstrap-confirm';
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
  return {
    ...state.auth.register,
  };
};

const mapDispatchToProps = {
  changeEmail: RegisterActions.changeEmail,
  changeFullName: RegisterActions.changeFullName,
  changePassword: RegisterActions.changePassword,
  reset: RegisterActions.reset,
  register: RegisterOperations.register,
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: (props) => async (body) => {
      try {
        await props.register(body);
        props.history.push(routes.signUp);
        toast.success('Register Successful');
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

export default enhance(RegisterFormComponent);
