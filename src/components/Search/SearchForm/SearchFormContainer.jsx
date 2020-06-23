import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { ProductsOperations } from '../../../models/products';
import { GetWantedProductsOperations } from '../../../models/products/getProducts/getWanted';
import { withRouter, generatePath } from 'react-router-dom';
import { routes } from '../../../scenes/router';

import SearchFormView from './SearchFormView';
import { inputHints } from '../../../service/localStorage';
export const historyName = {
  keywords: 'input-keywords',
};
const mapStateToProps = (state) => {
  return {
    searchFields: state.products.addSaveFetchProduct.searchFields,
  };
};
const mapDispatchToProps = {
  resetWanted: GetWantedProductsOperations.resetWanted,
  changeSearchField: ProductsOperations.changeSearchField,
};

const enhancer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: (props) => (values) => {
      props.resetWanted();

      //adds keywords to local storage for keywords input history
      inputHints.setHints({
        nameHistory: historyName.keywords,
        hint: values.keywords,
      });
      let params = {};
      if (values.keywords.trim().length !== 0) {
        params.keywords = values.keywords.trim();
      }
      if (values.location.trim().length !== 0) {
        params.location = values.location.trim();
      }
      if (props.searchFields.priceFrom.trim().length !== 0) {
        params.priceFrom = props.searchFields.priceFrom.trim();
      }
      if (props.searchFields.priceTo.trim().length !== 0) {
        params.priceTo = props.searchFields.priceTo.trim();
      }

      props.history.push(
        generatePath(routes.wantedProduct, {
          ...params,
        }),
      );
    },
  }),
);
export default enhancer(SearchFormView);
