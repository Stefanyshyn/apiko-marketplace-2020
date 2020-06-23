import { connect } from 'react-redux';
import { LogoutOperations } from '../../../models/auth/logout';
import { compose, withHandlers, withState } from 'recompose';
import { ViewerSelectors } from '../../../models/viewer';
import MainHeaderView from './MainHeaderView';
import { withRouter } from 'react-router-dom';
import { routes } from '../../../scenes/router';
import { GetLatestProductsOperations } from '../../../models/products/getProducts/getLatest';
const mapStateToProps = (state) => {
  return {
    user: ViewerSelectors.getCurrentUser(state),
    logout: LogoutOperations.logout,
  };
};

const mapDispatchToProps = {
  getLatest: GetLatestProductsOperations.getLatest,
  resetLatest: GetLatestProductsOperations.resetLatest,
  logout: LogoutOperations.logout,
};
const enhancer = compose(
  withRouter,
  withState('isOpen', 'setIsOpen', false),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onClickLogo: (props) => async () => {
      props.resetLatest();
      await props.getLatest({ limit: 30 });
      props.history.push(routes.productLatest);
    },
    toggle: (props) => () => {
      props.setIsOpen(!props.isOpen);
    },
  }),
);

export default enhancer(MainHeaderView);
