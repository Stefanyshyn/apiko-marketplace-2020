import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
} from 'recompose';
import { connect } from 'react-redux';

import { ProductSelectors } from '../../../models/products';
import { GetWantedProductsOperations } from '../../../models/products/getProducts/getWanted';
import ProductsWantedView from './ProductsWantedView';

const mapStateToProps = (state) => {
  return {
    products: ProductSelectors.getWantedProducts(state),
    hasNextProducts:
      state.products.fetchProductSetting.wanted.hasNextProduct,
    isNextProductsLoading:
      state.products.fetchProductSetting.wanted.isLoading,
  };
};

const mapDispatchToProps = {
  getProductsByFilter: GetWantedProductsOperations.getByFilter,
  resetWanted: GetWantedProductsOperations.resetWanted,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({ limit: 20 }),
  withHandlers({
    loadNextProduct: (props) => async () => {
      let offset = null;
      if (props.products?.length !== 0)
        offset = props.products.length;

      let body = {
        offset: offset,
        limit: props.limit,
      };

      if (props.match.params.keywords) {
        body.keywords = props.match.params.keywords;
      }
      if (props.match.params.location) {
        body.location = props.match.params.location;
      }
      if (props.match.params.priceFrom) {
        body.priceFrom = props.match.params.priceFrom;
      }
      if (props.match.params.priceTo) {
        body.priceTo = props.match.params.priceTo;
      }

      await props.getProductsByFilter(body);
    },
  }),
  lifecycle({
    componentDidMount() {
      if (
        !this.props.isNextProductsLoading &&
        this.props.products.length === 0
      ) {
        let body = {
          offset: 0,
          limit: this.props.limit,
        };
        if (this.props.match.params.keywords) {
          body.keywords = this.props.match.params.keywords;
        }
        if (this.props.match.params.location) {
          body.location = this.props.match.params.location;
        }
        if (this.props.match.params.priceFrom) {
          body.priceFrom = this.props.match.params.priceFrom;
        }
        if (this.props.match.params.priceTo) {
          body.priceTo = this.props.match.params.priceTo;
        }

        this.props.getProductsByFilter(body);
      }
    },
    componentWillUpdate(nextProps) {
      if (
        this.props.match.params.keywords !==
          nextProps.match.params.keywords ||
        this.props.match.params.location !==
          nextProps.match.params.location
      ) {
        let body = {
          offset: 0,
          limit: this.props.limit,
        };
        if (nextProps.match.params.keywords) {
          body.keywords = nextProps.match.params.keywords;
        }
        if (nextProps.match.params.location) {
          body.location = nextProps.match.params.location;
        }
        this.props.getProductsByFilter(body);
      }
    },
    componentWillMount() {
      this.props.resetWanted();
    },
  }),
);

export default enhance(ProductsWantedView);
