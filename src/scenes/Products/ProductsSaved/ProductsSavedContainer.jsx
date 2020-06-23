import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
} from 'recompose';
import { connect } from 'react-redux';

import { ProductSelectors } from '../../../models/products';

import { GetSavedProductsOperations } from '../../../models/products/getProducts/getSaved';
import ProductsSavedView from './ProductsSavedView';

const mapStateToProps = (state) => {
  return {
    products: ProductSelectors.getSavedProducts(state),
    hasNextProducts:
      state.products.fetchProductSetting.saved.hasNextProduct,
    isNextProductsLoading:
      state.products.fetchProductSetting.saved.isLoading,
  };
};

const mapDispatchToProps = {
  getSaved: GetSavedProductsOperations.getSaved,
  resetSaved: GetSavedProductsOperations.resetSaved,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({ limit: 30 }),
  withHandlers({
    loadNextProduct: (props) => async () => {
      this.props.resetSaved();
      await props.getSaved({ limit: props.limit });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.resetSaved();

      this.props.getSaved({ limit: this.props.limit });
    },
  }),
);

export default enhance(ProductsSavedView);
