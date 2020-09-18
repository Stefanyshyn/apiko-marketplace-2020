import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-modal';
import ContactSeller from './components/ContactSeller/ContactSeller';
import NoAuth from '../../../../../../components/Modal/components/NoAuth';
import { useViewer } from '../../../../../../stores/ViewerStore';

Modal.setAppElement('#root');

const styleModal = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.37)',
  },
  content: {
    background: '#FFFFFF',
    boxShadow: ' 0px 2px 42px rgba(0, 0, 0, 0.111233)',
    borderRadius: '7px',
    padding: '0 !important',
  },
};

const SendMessageModal = ({ product, isOpen, setOpen }) => {
  const viewer = useViewer();
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Modal
      style={styleModal}
      onRequestClose={onClose}
      isOpen={isOpen}
    >
      {viewer ? (
        <ContactSeller
          product={product}
          onClose={onClose}
        ></ContactSeller>
      ) : (
        <NoAuth />
      )}
    </Modal>
  );
};

export default observer(SendMessageModal);
