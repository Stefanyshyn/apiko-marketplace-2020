import {
  compose,
  withHandlers,
  withState,
  lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import { ProductsOperations } from '../../../models/products';
import ProductView from './ProductExpandView';
import { ViewerSelectors } from '../../../models/viewer';

const mapStateToProps = (state) => {
  return {
    viewer: ViewerSelectors.getCurrentUser(state),
    viewerId: state.viewer.user,
    saveProduct: state.products.addSaveFetchProduct.saveProduct,
  };
};

const mapDispatchToProps = {
  save: ProductsOperations.save,
  deleteSaved: ProductsOperations.deleteSaved,
};
const enhancer = compose(
  withState('isModalOpen', 'setModalOpen', false),
  withState('isSaved', 'setIsSaved', false),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.setIsSaved(this.props.product.saved);
    },
  }),
  withHandlers({
    onSave: (props) => async (event) => {
      event.stopPropagation();
      if (!props.saveProduct.isLoading) {
        props.setIsSaved(true);
        await props.save(props.product.id);
        props.setIsSaved(props.product.saved);
      }
    },
    onDeleteSaved: (props) => async (event) => {
      event.stopPropagation();
      if (!props.saveProduct.isLoading) {
        props.setIsSaved(false);
        await props.deleteSaved(props.product.id);
        props.setIsSaved(props.product.saved);
      }
    },
  }),
);
export default enhancer(ProductView);
