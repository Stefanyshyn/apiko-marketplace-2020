import { connect } from 'react-redux';

import { ProductSelectors } from '../../models/products';
import { GetUserProductsOperations } from '../../models/products/getProducts/getUser';
import { lifecycle, compose } from 'recompose';

import ProfileView from './ProfileView';
import { withRouter } from 'react-router-dom';
import { UsersOperations, UsersSelectors } from '../../models/users';
import { ViewerSelectors } from '../../models/viewer';

const mapStateToProps = (state, props) => {
  return {
    user: UsersSelectors.getUser(state, props.match.params.id),
    products: ProductSelectors.getUserProducts(
      state,
      props.match.params.id,
    ),
    fetchUser: state.users.fetchViewer,
    viewer: ViewerSelectors.getCurrentUser(state),

    isProductsLoading:
      state.products.fetchProductSetting.user.isProductsLoading,
  };
};
const mapDispatchToProps = {
  getUser: UsersOperations.fetchUser,
  getUserProducts: GetUserProductsOperations.getUserProducts,
  resetUserProducts: GetUserProductsOperations.resetUserProducts,
};

const enhancer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      if (!this.props.user)
        this.props.getUser(this.props.match.params.id);
      this.props.getUserProducts(this.props.match.params.id);
    },

    componentWillUpdate(nextProps) {
      if (this.props.match.params.id !== nextProps.match.params.id) {
        this.props.resetUserProducts();
        this.props.getUser(nextProps.match.params.id);
        this.props.getUserProducts(nextProps.match.params.id);
      }
    },
  }),
);

export default enhancer(ProfileView);
