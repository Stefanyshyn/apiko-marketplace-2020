import React from 'react';
import s from './AddProduct.module.scss';
import MainHeader from '../../components/Headers/MainHeader/MainHeader';
import Footer from '../../components/Footer/Footer';

import AddProductForm from '../../components/Form/AddProduct/AddProductContainer';
import { routes } from '../router';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const AddProductView = ({ fetchViewer }) => {
  if (fetchViewer.isLoading) return <Spinner />;

  if (fetchViewer.isError) return <Redirect to={routes.home} />;

  return (
    <div className={s.container}>
      <MainHeader />
      <div className={s.content}>
        <AddProductForm />
      </div>
      <Footer />
    </div>
  );
};
export default AddProductView;
