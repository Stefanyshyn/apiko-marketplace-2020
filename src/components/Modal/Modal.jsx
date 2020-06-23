import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './Modal.module.scss';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ModalRefresh({ children, isOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

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
    <div className={s.modalNoRefresh}>
      <Modal
        style={styleModal}
        onRequestClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        isClose={() => setIsModalOpen(false)}
      >
        {children}
      </Modal>
    </div>
  );
}

export default ModalRefresh;
