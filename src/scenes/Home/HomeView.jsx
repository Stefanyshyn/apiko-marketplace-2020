import React from 'react';
import s from './Home.module.scss';
import MainHeader from '../../components/Headers/MainHeader/MainHeaderContainer';
import Footer from '../../components/Footer/Footer';
import { v4 } from 'uuid';
import SearchForm from '../../components/Search/SearchForm/SearchFormContainer';

import { Switch, Route } from 'react-router-dom';
import Product from '../Products/Product/ProductConatainer';
import { routes } from '../router';
import NotFound from '../NotFound/NotFound';
import Spinner from '../../components/Spinner/Spinner';
import ProductsWanted from '../Products/ProductsWanted/ProductsWantedConatainer';
import ProductsLatest from '../Products/ProductsLatest/ProductsLatestConatainer';
import SavedProducts from '../Products/ProductsSaved/ProductsSavedContainer';

const Home = ({ fetchViewer }) => {
  if (fetchViewer.isLoading) return <Spinner />;
  return (
    <div className={s.container}>
      <Switch>
        <Route
          exact
          path={routes.savedProducts}
          render={() => (
            <MainHeader isSell={true} isSavedProducts={true}>
              <SearchForm />
            </MainHeader>
          )}
        />
        <Route
          render={() => (
            <MainHeader isSell={true}>
              <SearchForm />
            </MainHeader>
          )}
        />
      </Switch>
      <div className={s.content}>
        <Switch>
          <Route
            exact
            path={[routes.home, routes.productLatest]}
            component={ProductsLatest}
          />
          <Route
            exact
            key={v4()}
            path={routes.wantedProduct}
            component={ProductsWanted}
          />
          <Route
            exact
            path={routes.savedProducts}
            component={SavedProducts}
          />
          <Route exact path={routes.product} component={Product} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
