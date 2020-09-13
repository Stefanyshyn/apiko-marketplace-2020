import React from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-modal';
import ContactSellerModalView from '../../../../../../components/Modal/ContactSeller/ContactSellerView';
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

  return (
    <Modal
      style={styleModal}
      onRequestClose={setOpen.bind(null, [false])}
      isOpen={isOpen}
    >
      {viewer ? (
        <ContactSellerModalView
          product={product}
          onClose={setOpen}
        ></ContactSellerModalView>
      ) : (
        <NoAuth />
      )}
    </Modal>
  );
};

export default observer(SendMessageModal);
