import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import SendMessageView from './SendMessageView';
import { MessagesOperations } from '../../../models/messages';

const mapStateToProps = (state, props) => {
  return {};
};
const mapDispatchToProps = {
  sendMessage: MessagesOperations.sendMessage,
};
const enhancer = compose(
  withState('text', 'setText', ''),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    sendMessage: (props) => async (event) => {
      event.preventDefault();
      await props.sendMessage(props.chatId, props.text.trim());

      props.setText('');
    },
    onChange: (props) => (event) => {
      const { value } = event.target;
      props.setText(value);
    },
  }),
);
export default enhancer(SendMessageView);
