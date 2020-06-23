import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Dropdown.module.scss';
import { routes } from '../../../../scenes/router';
import Spinner from '../../../Spinner/Spinner';
import color from '../../../../utils/color';
const colorAvatar = color.getRandomColor();

const Dropdown = ({ user, onLogout }) => {
  const isUser = !!user;
  return (
    <UncontrolledDropdown>
      <DropdownToggle className={s.avaratMenu}>
        {isUser ? (
          user.avatar ? (
            <div className={s.avatar}>
              <img className={s.avatar} src={user.avatar} alt="NO" />
            </div>
          ) : (
            <div
              className={s.noAvatar}
              style={{ backgroundColor: colorAvatar }}
            >
              {user.fullName.slice(0, 2).toUpperCase()}
            </div>
          )
        ) : (
          <Spinner />
        )}
      </DropdownToggle>
      <DropdownMenu
        className={`${s.dropBoxAvatar} ${s.dropDorm}`}
        right
      >
        <div className={s.optionInfo}>
          <div className={s.optionInfoAvatar}>
            <Link to={generatePath(routes.profile, { id: user.id })}>
              {isUser ? (
                user.avatar ? (
                  <div className={s.avatar}>
                    <img
                      className={s.avatar}
                      src={user.avatar}
                      alt="NO"
                    />
                  </div>
                ) : (
                  <div
                    className={s.noAvatar}
                    style={{ backgroundColor: colorAvatar }}
                  >
                    {user.fullName.slice(0, 2).toUpperCase()}
                  </div>
                )
              ) : (
                <Spinner />
              )}
            </Link>
          </div>

          <div className={s.optionUserInfo}>
            <div className={s.infoFullname}>{user.fullName}</div>
            <div className={s.infoEmail}>{user.email}</div>
            <div className={s.infoBtnProfile}>
              <Link
                to={generatePath(routes.profile, { id: user.id })}
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
        <div className={s.optionEditProfile}>
          <Link to={routes.editProfile}>EDIT PROFILE</Link>
        </div>
        <div className={s.optionDelimeter} />
        <div className={s.optionLogout}>
          <Link
            to={routes.login}
            className={s.logout}
            onClick={onLogout}
          >
            LOGOUT
          </Link>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
export default Dropdown;
