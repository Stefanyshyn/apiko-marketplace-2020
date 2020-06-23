import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Spinner.module.scss';
import * as reactstrap from 'reactstrap';

function Spinner({ children }) {
  return (
    <div className={s.spinner}>
      <reactstrap.Spinner />
    </div>
  );
}

export default Spinner;
