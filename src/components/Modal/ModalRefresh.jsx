import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Modal.module.scss';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ModalRefresh({ children, isOpen }) {
  let history = useHistory();

  let back = (e) => {
    e.stopPropagation();
    history.go(-2);
  };

  const styleModal = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.37)',
    },
    content: {
      background: '#FFFFFF',
      boxShadow: ' 0px 2px 42px rgba(0, 0, 0, 0.111233)',
      borderRadius: '7px',
      paddingBottom: '30px',
      overflow: 'auto',
    },
  };

  return (
    <div
      className={s.modal}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.15)',
        overflow: 'auto',
      }}
    >
      {' '}
      <Modal style={styleModal} onRequestClose={back} isOpen={true}>
        {children}
      </Modal>
    </div>
  );
}

export default ModalRefresh;
