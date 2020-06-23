import {
  compose,
  lifecycle,
  withState,
  withHandlers,
} from 'recompose';
import { inputHints } from '../../../../service/localStorage';

import InputHintView from './InputHintView';

const enhancer = compose(
  withState('hints', 'setHints', []),
  lifecycle({
    componentDidMount() {
      let hints = inputHints.getHints({
        nameHistory: this.props.nameHistory,
      });
      //remove dublicate from array
      hints = [...new Set(hints)];
      hints = hints.filter((hint) => String(hint).trim());
      hints = hints.slice(0, 6);

      this.props.setHints((_hints) => hints);
    },
  }),
  withHandlers({
    clearHints: (props) => () => {
      debugger;
      inputHints.clearHints({ nameHistory: props.nameHistory });

      props.setHints((_hints) => []);
    },
    setField: (props) => (hint) => (event) => {
      props.setFieldKeywords(hint);
    },
  }),
);
export default enhancer(InputHintView);
