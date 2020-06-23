import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Owner.module.scss';
import Avatar from '../../Avatar/Avatar';
import { Link, generatePath } from 'react-router-dom';
import { routes } from '../../../scenes/router';
const Owner = ({ owner }) => {
  return (
    <div className={s.container}>
      <Link to={generatePath(routes.profile, { id: owner.id })}>
        <Avatar
          classWrapper={s.avatarWrapper}
          src={owner.avatar}
          alt={owner.fullName}
          style={{ zIndex: 999999 }}
          type="circle"
          width="72px"
          height="72px"
        />
      </Link>

      <div className={s.header}></div>
      <div className={s.fullName}>{owner.fullName}</div>
      <div className={s.location}>{owner.location}</div>
    </div>
  );
};

export default Owner;
