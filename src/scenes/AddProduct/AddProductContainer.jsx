import { connect } from 'react-redux';

import AddProductView from './AddProductView';

const mapStateToProps = (state) => {
  return {
    fetchViewer: state.viewer.fetchViewer,
  };
};

export default connect(mapStateToProps)(AddProductView);
