import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import s from './OwnerInfo.module.scss';
import Avatar from '../../../../../components/Avatar/Avatar';
import { Link, generatePath } from 'react-router-dom';
import { routes } from '../../../../router';
import { useEffect } from 'react';
import Spinner from '../../../../../components/Spinner/Spinner';
import { observer } from 'mobx-react';
import { useViewer } from '../../../../../stores/ViewerStore';

const OwnerInfo = ({ product }) => {
  const owner = product?.owner;

  useEffect(() => {
    if (!owner) {
      product.fetchOwner();
    }
  });

  const viewer = useViewer();

  if (!owner)
    return (
      <div className={s.spinnerWrapper}>
        <Spinner />
      </div>
    );
  if (owner.id !== viewer.id)
    return (
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
    );

  return '';
};

export default observer(OwnerInfo);
