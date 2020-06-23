import { ProductsOperations } from '../../../models/products';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import SortFormView from './SortFormView';

const mapStateToProps = (state) => {
  return {
    priceFrom:
      state.products.addSaveFetchProduct.searchFields.priceFrom,
    priceTo: state.products.addSaveFetchProduct.searchFields.priceTo,
  };
};
const mapDispatchToProps = {
  changeSearchField: ProductsOperations.changeSearchField,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onChange: (props) => (event) => {
      const { name, value } = event.target;
      props.changeSearchField(name, value);
    },
  }),
);
export default enhancer(SortFormView);
