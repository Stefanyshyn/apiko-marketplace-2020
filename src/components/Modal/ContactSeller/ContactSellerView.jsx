import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './ContactSeller.module.scss';
import { Media } from 'reactstrap';
import SubmiButton from '../../SubmiButton/SubmiButton';
import ErrorForm from '../../Form/components/Error/ErrorForm';

function ContactSellerModalView({
  product,
  onClose,
  text,
  onChange,
  onSubmit,
  fetchSend,
}) {
  const owner = product.owner;
  useEffect(() => {
    if (!product.fetchOwner.isLoading && !owner)
      product.fetchOwner.run();
  });
  let disabled =
    String(text).trim().length === 0 || fetchSend.isLoading;
  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.titleModal}>Contact seller</div>
        <div className={s.close} onClick={(e) => onClose(false)}>
          <div className={s.line1}></div>
          <div className={s.line2}></div>
        </div>
      </header>
      {product ? (
        <div className={s.titleWrapper}>Subject: {product.title}</div>
      ) : (
        'loading'
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
              value={text}
              onChange={onChange}
              placeholder="For example: Iron man suit"
            />
          </div>
        </div>
        {fetchSend.isError ? (
          <ErrorForm style={{ textAlign: 'center' }}>
            {String(fetchSend.error.message)[0].toUpperCase() +
              String(fetchSend.error.message).slice(1)}
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

export default ContactSellerModalView;
