import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { ProductsOperations } from '../../../models/products';
import ProductView from './ProductView';
import { withRouter, generatePath } from 'react-router-dom';
import { routes } from '../../../scenes/router';

const mapDispatchToProps = {
  save: ProductsOperations.save,
  deleteSaved: ProductsOperations.deleteSaved,
};
const enhancer = compose(
  withRouter,
  connect(undefined, mapDispatchToProps),
  withHandlers({
    clickOnProduct: (props) => () => {
      props.history.push(
        generatePath(routes.product, { id: props.product.id }),
      );
    },
    onSave: (props) => async (event) => {
      event.stopPropagation();
      let parent = event.target.parentNode;

      while (parent.tagName !== 'DIV') parent = parent.parentNode;

      parent.style.background = '#349A89';

      await props.save(props.product?.id);

      parent.style.background = 'white';
    },
    onDeleteSaved: (props) => async (event) => {
      event.stopPropagation();
      let parent = event.target.parentNode;

      while (parent.tagName !== 'DIV') parent = parent.parentNode;

      parent.style.background = '#349A89';

      await props.deleteSaved(props.product?.id);

      parent.style.background = 'white';
    },
  }),
);
export default enhancer(ProductView);
