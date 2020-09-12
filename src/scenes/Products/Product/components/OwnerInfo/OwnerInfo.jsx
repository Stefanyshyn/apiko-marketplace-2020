import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './OwnerInfo.module.scss';
import Avatar from '../../../../../components/Avatar/Avatar';
import { Link, generatePath } from 'react-router-dom';
import { routes } from '../../../../router';
import { useEffect } from 'react';
import Spinner from '../../../../../components/Spinner/Spinner';
import { observer } from 'mobx-react';
import { useViewer } from '../../../../../stores/ViewerStore';
import SendMessageButton from '../components/SendMessageButton/SendMessageButton';
import Icon from '../../../../../atom/Icon/Icon';

export function useSaved(product, _isSaved = false) {
  const [isSaved, setSaved] = useState(false);

  async function onSave(event) {
    event.stopPropagation();
    if (product.saveProduct.isLoading) {
      setSaved(true);
      await product.save.run();
      setSaved(product.saved);
    }
  }
  async function onUnsave(event) {
    event.stopPropagation();
    if (product.saveProduct.isLoading) {
      setSaved(false);
      await product.unsave.run();
      setSaved(product.saved);
    }
  }
  return [isSaved, onSave, onUnsave];
}
const UserInfo = ({ product }) => {
  const owner = product?.owner;
  const [isOpen, setOpen] = useState(false);
  const [isSaved, onSave, onUnsave] = useSaved();

  useEffect(() => {
    if (owner) {
      console.log(product);
      product.fetchOwner();
    }
  });

  const viewer = useViewer();

  if (!owner) return <Spinner />;
  if (owner.id !== viewer.id)
    return (
      <React.Fragment>
        <div className={s.containerOwner}>
          <div className={s.container}>
            <Link to={generatePath(routes.profile, { id: owner.id })}>
              <Avatar
                classWrapper={s.avatarWrapper}
                src={owner.avatar}
                alt={owner.fullName}
                style={{ zIndex: 999999 }}
                type="circle"
                width="72px"
                height="72px"
              />
            </Link>

            <div className={s.header}></div>
            <div className={s.fullName}>{owner.fullName}</div>
            <div className={s.location}>{owner.location}</div>
          </div>
          <div className={s.chatBtn} onClick={(e) => setOpen(true)}>
            Chat with seller
          </div>
          {isSaved ? (
            <div className={s.noSavedProduct} onClick={onUnsave}>
              <Icon name="greenHeart" width="17px" height="15px" />
              <div className={s.titleSave}>
                <div className={s.titleBtnSave}>
                  {' '}
                  Delete from favorive
                </div>
              </div>
            </div>
          ) : (
            <div className={s.savedProduct} onClick={onSave}>
              <Icon name="heart" width="17px" height="15px" />
              <div className={s.titleUnsave}>Add to favorive</div>
            </div>
          )}
        </div>
        <SendMessageButton
          product={product}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      </React.Fragment>
    );

  return '';
};

export default observer(UserInfo);
