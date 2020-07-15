import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import Router from './scenes/router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from './stores/createStore';

function App() {
  const store = useStore();

  useEffect(() => {
    store.bootstrap();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
