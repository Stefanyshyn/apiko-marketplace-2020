import { compose } from 'recompose';
import { connect } from 'react-redux';

import HomeView from './HomeView';

const mapStateToProps = (state) => {
  return {
    fetchViewer: state.viewer.fetchViewer,
  };
};

const enhance = compose(connect(mapStateToProps));

export default enhance(HomeView);
