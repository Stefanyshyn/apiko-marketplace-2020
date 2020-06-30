import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import Router from './scenes/router';
import Spinner from './components/Spinner/Spinner';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from './stores/createStore';

function App() {
  const store = useStore();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    store.bootstrap().then(() => setLoading(false));
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
