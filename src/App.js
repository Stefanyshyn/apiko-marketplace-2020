import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { AppOperations } from './models/app';
import Router from './scenes/router';
import Spinner from './components/Spinner/Spinner';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

class App extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(AppOperations.init());
  }
  render = () => {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    return (
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.app.isLoading,
  };
};

export default connect(mapStateToProps)(App);
