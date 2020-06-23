import { compose } from 'recompose';
import { connect } from 'react-redux';

import ProductListView from './ProductListView';

const mapStateToProps = (state, { typeProducts }) => {
  return {};
};

const mapDispatchToProps = {};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhancer(ProductListView);
