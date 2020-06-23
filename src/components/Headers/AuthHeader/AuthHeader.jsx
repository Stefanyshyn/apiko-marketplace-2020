import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './AuthHeader.module.scss';

import Icon from '../../../atom/Icon/Icon';
import { routes } from '../../../scenes/router';
import {
  NavbarBrand,
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
} from 'reactstrap';

const AuthHeader = ({ isLoginForm }) => {
  const [isOpen, setIsOpen] = useState(false);

  let location = useLocation();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <Navbar light expand="md">
          <NavbarBrand to={routes.home} className={s.layoutLogo}>
            <Icon
              className={s.layoutLogoIcon}
              name="logo"
              size="102px"
            />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} className={s.layoutLeft} navbar>
            <NavItem>
              <div className={s.layoutMenu}>
                <Link
                  to={{
                    pathname: routes.addProduct,
                    state: { background: location },
                  }}
                >
                  <div className={s.layoutMenuSell}>
                    <span className={s.layoutMenuSellText}>SELL</span>
                  </div>
                </Link>
              </div>
            </NavItem>
            <NavItem>
              <div className={s.layoutLogin}>
                {isLoginForm ? (
                  <Link
                    to={routes.signUp}
                    className={s.layoutLoginText}
                  >
                    REGISTER
                  </Link>
                ) : (
                  <Link
                    to={routes.login}
                    className={s.layoutLoginText}
                  >
                    LOGIN
                  </Link>
                )}
              </div>
            </NavItem>
          </Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default AuthHeader;
