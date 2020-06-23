import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
} from 'recompose';
import { connect } from 'react-redux';
import { ProductSelectors } from '../../../models/products';
import { GetLatestProductsOperations } from '../../../models/products/getProducts/getLatest';
import ProductsLatestView from './ProductsLatestView';

const mapStateToProps = (state) => {
  return {
    products: ProductSelectors.getLatestProducts(state),
    hasNextProducts:
      state.products.fetchProductSetting.latest.hasNextProduct,
    isNextProductsLoading:
      state.products.fetchProductSetting.latest.isLoading,
  };
};

const mapDispatchToProps = {
  getLatest: GetLatestProductsOperations.getLatest,
  resetLatest: GetLatestProductsOperations.resetLatest,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({ limit: 20 }),
  withHandlers({
    loadNextProduct: (props) => async () => {
      let from = null;
      if (props.products?.length !== 0)
        from = props.products[props.products.length - 1].id;
      await props.getLatest({ from: from, limit: props.limit });
    },
  }),
  lifecycle({
    componentDidMount() {
      if (
        !this.props.isNextProductsLoading &&
        this.props.products.length === 0
      ) {
        this.props.resetLatest();

        this.props.getLatest({ limit: this.props.limit });
      }
    },
  }),
);

export default enhance(ProductsLatestView);
