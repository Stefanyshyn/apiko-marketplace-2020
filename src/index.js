import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/createStore';
import {
  Provider as MSTProvider,
  createStore,
} from './stores/createStore';

const MSTStore = createStore();

ReactDOM.render(
  <Provider store={store}>
    <MSTProvider value={MSTStore}>
      <App />
    </MSTProvider>
  </Provider>,
  document.getElementById('root'),
);
