import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import {
  ProductsOperations,
  ProductSelectors,
} from '../../../models/products';
import Product from './ProductView';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, props) => {
  return {
    product: ProductSelectors.getProduct(state, [
      props.match.params.id,
    ]),
    owner: ProductSelectors.getProductOwner(
      state,
      props.match.params.id,
    ),
    fetchProduct: state.products.addSaveFetchProduct.fetchProduct,
  };
};

const mapDispatchToProps = {
  fetchProduct: ProductsOperations.fetchProduct,
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      if (!this.props.product || !this.props.owner) {
        this.props.fetchProduct(this.props.match.params.id);
      }
    },
  }),
);

export default enhance(Product);
