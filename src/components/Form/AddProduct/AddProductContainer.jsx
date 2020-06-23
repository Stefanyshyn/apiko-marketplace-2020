import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { ProductsOperations } from '../../../models/products';

import AddProductView from './AddProductView';
import confirm from 'reactstrap-confirm';
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
  return {
    addProductsFields:
      state.products.addSaveFetchProduct.addProductsFields,
    fetchAddProduct:
      state.products.addSaveFetchProduct.fetchAddProduct,
  };
};

const mapDispatchToProps = {
  changeAddProductField: ProductsOperations.changeAddProductField,
  addProduct: ProductsOperations.add,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: (props) => async (body) => {
      let result = await confirm({
        message: 'Add product?',
        confirmText: 'Confirm',
        confirmColor: 'warning',
        cancelColor: 'link text-danger',
      });
      if (result) {
        try {
          await props.addProduct(body);
          toast.success('The product has been added');
        } catch (err) {
          toast.error(err?.message);
        }
      }
    },
  }),
);
export default enhance(AddProductView);
