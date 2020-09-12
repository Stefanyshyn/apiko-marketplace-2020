import React from 'react';
import s from './NoAuth.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../../scenes/router';

function NoAuth() {
  return (
    <div className={s.container}>
      <div className={s.title}>
        You must be logged in before you can add a product.
      </div>

      <div className={s.links}>
        <div className={s.textLinks}>
          <div>You can</div>
          <Link
            to={routes.signUp}
            onClick={(e) => e.stopPropagation()}
            className={s.signUp}
          >
            Create account
          </Link>
          <Link
            to={routes.login}
            onClick={(e) => e.stopPropagation()}
            className={s.login}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NoAuth;
