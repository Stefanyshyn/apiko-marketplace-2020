import React, { useCallback, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Logo.module.scss';
import { routes } from '../../../../scenes/router';
import { useHistory } from 'react-router-dom';
import { getRoot } from 'mobx-state-tree';
import { NavbarBrand } from 'reactstrap';

import Icon from '../../../../atom/Icon/Icon';
import { useLatestProductsStore } from '../../../../stores/Products/LatestProdutsStore';
import { observer } from 'mobx-react';
const Logo = ({ theme }) => {
  const themes = useMemo(
    () => ({
      light: 'logoLight',
      black: 'logo',
    }),
    [],
  );
  const history = useHistory();
  const latestProducts = useLatestProductsStore();
  const onClickLogo = useCallback(async () => {
    latestProducts.reset();
    getRoot(latestProducts).app.setLoadingProgressBar(true);
    await latestProducts.fetchLatest.run({ limit: 30 });
    history.push(routes.productLatest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NavbarBrand to={routes.home}>
      <div onClick={onClickLogo}>
        <Icon
          className={s.logoIcon}
          name={themes[theme]}
          size="102px"
        />
      </div>
    </NavbarBrand>
  );
};
export default observer(Logo);
