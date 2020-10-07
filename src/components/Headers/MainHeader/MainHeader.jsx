import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import s from './MainHeader.module.scss';

import Icon from '../../../atom/Icon/Icon';
import Dropdown from '../components/Dropdown/Dropdown';

import { routes } from '../../../scenes/router';
import { Navbar, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { useStore } from '../../../stores/createStore';
import { observer } from 'mobx-react';
import Logo from '../components/Logo/Logo';

const MainHeader = ({ isSell, isSavedProducts, children }) => {
  const store = useStore();
  const user = store.viewer.user;
  const isUser = !!user;
  const logout = useStore((store) => store.auth.logout);
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  let location = useLocation();
  return (
    <header className={s.wrap}>
      <div className={s.up}>
        <Navbar light expand="md" className={s.navContainer}>
          <Logo theme="light" />
          <NavbarToggler className="navbar-dark" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className={s.layoutLeft}>
            {user ? (
              <NavItem>
                <Link className={s.inbox} to={routes.inbox}>
                  <Icon name="inbox" width="18px" height="18px" />
                </Link>
              </NavItem>
            ) : (
              ''
            )}
            <NavItem>
              <div className={s.layoutMenu}>
                {isSell ? (
                  <Link
                    to={{
                      pathname: routes.addProduct,
                      state: { background: location },
                    }}
                  >
                    <div className={s.layoutMenuSell}>
                      <span className={s.layoutMenuSellText}>
                        SELL
                      </span>
                    </div>
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </NavItem>
            <NavItem>
              <div className={s.layoutLogin}>
                {isUser ? (
                  <Dropdown user={user} onLogout={logout} />
                ) : (
                  <Link to={routes.login} className={s.Login}>
                    LOGIN
                  </Link>
                )}
              </div>
            </NavItem>
            <NavItem>
              <div className={s.layoutHeeart}>
                {isSavedProducts ? (
                  <Icon
                    className={s.layoutHeeartIcon}
                    name="whiteHeart"
                    width="20px"
                    height="18.61px"
                  />
                ) : user ? (
                  <Link to={routes.savedProducts}>
                    <Icon
                      className={s.layoutHeeartIcon}
                      name="heartLight"
                      width="20px"
                      height="18.61px"
                    />
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </NavItem>
          </Collapse>
        </Navbar>
      </div>

      <div className={s.down}>{children}</div>
    </header>
  );
};

export default observer(MainHeader);
