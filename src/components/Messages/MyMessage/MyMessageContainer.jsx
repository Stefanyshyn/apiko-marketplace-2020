import { compose } from 'recompose';
import { connect } from 'react-redux';

import MyMessageView from './MyMessageView';

const mapStateToProps = (state, props) => {
  return {
    sendMessage: state.messages.sendMessage,
  };
};
const mapDispatchToProps = {};
const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
);
export default enhancer(MyMessageView);
