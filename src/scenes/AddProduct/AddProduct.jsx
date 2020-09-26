import React from 'react';
import s from './AddProduct.module.scss';
import MainHeader from '../../components/Headers/MainHeader/MainHeader';
import Footer from '../../components/Footer/Footer';

import AddProductForm from '../../components/Form/AddProduct/AddProduct';

const AddProduct = () => {
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
export default AddProduct;
