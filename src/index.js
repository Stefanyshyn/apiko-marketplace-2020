import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {
  Provider as MSTProvider,
  createStore,
} from './stores/createStore';

const MSTStore = createStore();

ReactDOM.render(
  <MSTProvider value={MSTStore}>
    <App />
  </MSTProvider>,
  document.getElementById('root'),
);
