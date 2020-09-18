import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './ContactSeller.module.scss';
import { Media } from 'reactstrap';
import { generatePath, useHistory } from 'react-router-dom';
import { routes } from '../../../../../../../router';
import { observer } from 'mobx-react';
import SubmiButton from '../../../../../../../../components/SubmiButton/SubmiButton';
import ErrorForm from '../../../../../../../../components/Form/components/Error/ErrorForm';
import { useProductsCollection } from '../../../../../../../../stores/Products/ProductsCollection';

function ContactSellerModalView({ product, onClose }) {
  const history = useHistory();
  const products = useProductsCollection();
  const [message, setMessage] = useState('');
  const owner = product.owner;
  const fetchSend = product.createChat;
  const disabled =
    !String(message).trim().length || fetchSend.isLoading;

  useEffect(() => {
    if (!owner) product.fetchOwner.run();
    if (product.chatId) products.fetchById(product.id);
  });

  const onChange = useCallback((event) => {
    const { value } = event.target;
    setMessage(value);
  }, []);
  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const chatId = await product.createChat.run(message);
        history.push(generatePath(routes.inboxChat, { chatId }));
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, message]
  );

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.titleModal}>Contact seller</div>
        <div className={s.close} onClick={onClose}>
          <div className={s.line1}></div>
          <div className={s.line2}></div>
        </div>
      </header>
      {product ? (
        <div className={s.titleWrapper}>Subject: {product.title}</div>
      ) : (
        'Loading'
      )}
      {owner ? (
        <div className={s.ownerWrapper}>
          <div className={s.avatar}>
            <Media src={owner.avatar} alt="Avatar" />
          </div>
          <div className={s.infoOwner}>
            <div className={s.fullName}>{owner.fullName}</div>
            <div className={s.location}>{owner.location}</div>
          </div>
        </div>
      ) : (
        'Loading'
      )}
      <form onSubmit={onSubmit}>
        <div className={s.msgWrapper}>
          <div className={s.titleMsg}>Message</div>
          <div className={s.inputMsg}>
            <textarea
              type="textarea"
              value={message}
              onChange={onChange}
              placeholder="For example: Iron man suit"
            />
          </div>
        </div>
        {fetchSend.isError && fetchSend.err ? (
          <ErrorForm style={{ textAlign: 'center' }}>
            {fetchSend.err[0].toUpperCase() + fetchSend.err.slice(1)}
          </ErrorForm>
        ) : (
          ''
        )}
        <div className={s.submitWrapper}>
          <SubmiButton
            className={s.submit}
            value={fetchSend.isLoading ? 'Loading' : 'Submit'}
            disabled={disabled ? 'disabled' : ''}
            onSubmit={onSubmit}
          ></SubmiButton>
        </div>
      </form>
    </div>
  );
}

export default observer(ContactSellerModalView);
