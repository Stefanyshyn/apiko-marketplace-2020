import { compose } from 'recompose';
import { connect } from 'react-redux';

import OwnerMessageView from './OwnerMessageView';

const mapStateToProps = (state, props) => {
  return {};
};
const mapDispatchToProps = {};
const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
);
export default enhancer(OwnerMessageView);
