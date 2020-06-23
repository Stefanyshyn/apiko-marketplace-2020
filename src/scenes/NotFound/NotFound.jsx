import React from 'react';
import s from './NotFound.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../router';

const NotFound = () => {
  return (
    <div className={s.container}>
      404 Not Found
      <Link to={routes.home}> Back to the home</Link>
    </div>
  );
};

export default NotFound;
