import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={s.layoutFooterLineWrap}>
        <div className={s.layoutFooterLine}></div>
      </div>
      <div className={s.layoutFooterCopyrightWrap}>
        <div className={s.layoutFooterCopyright}>
          Copyright © 2017. Privacy Policy.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
