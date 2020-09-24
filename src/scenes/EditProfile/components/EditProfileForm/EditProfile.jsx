import React, { useCallback } from 'react';
import style from './EditProfile.module.scss';
import { Formik } from 'formik';
import * as Y from 'yup';
import ErrorInput from '../../../../components/Form/components/Error/ErrorInput';
import Input from '../../../../components/Form/components/Input/Input';
import ErrorForm from '../../../../components/Form/components/Error/ErrorForm';
import Icon from '../../../../atom/Icon/Icon';
import SubmiButton from '../../../../components/SubmiButton/SubmiButton';
import { observer } from 'mobx-react';
import confirm from 'reactstrap-confirm';
import { useViewer } from '../../../../stores/ViewerStore';

const EditProfile = () => {
  const viewer = useViewer();
  const user = viewer.user;
  const onSubmit = useCallback(
    async (avatar, fullName, phone, location) => {
      let result = await confirm({
        message: 'Edit data?',
        confirmText: 'Confirm',
        confirmColor: 'warning',
        cancelColor: 'link text-danger',
      });
      if (result) {
        await viewer.editUser.run(avatar, fullName, phone, location);
      }
    },
    [viewer],
  );

  const onUpdatePhoto = useCallback(
    (setFieldValue, setTouched) => (event) => {
      event.preventDefault();
      const select = document.createElement('input');
      select.setAttribute(
        'accept',
        '.jpg,.jpeg,.png,.gif,.apng,.tiff,.tif,.bmp,.xcf,.webp,.mp4,.mov',
      );
      select.type = 'file';
      select.onchange = async (e) => {
        let file = e.target.files[0];
        setFieldValue('avatar', URL.createObjectURL(file));
        setFieldValue('newAvatar', file);
        setTouched('avatar');
      };
      select.click();
    },
    [],
  );
  const { isLoading, isError, err } = viewer.editUser;
  return (
    <Formik
      initialValues={{
        avatar: user.avatar,
        newAvatar: null,
        fullName: user.fullName,
        phone: user.phone || '',
      }}
      validationSchema={Y.object({
        avatar: Y.string(),
        fullName: Y.string()
          .max(50, 'Full name is too long!!')
          .required('Required'),
        phone: Y.string().max(20, 'Phone is too long!!'),
      })}
      onSubmit={(values) => {
        const avatar = values.newAvatar || values.avatar;
        const fullName = values.fullName || null;
        const phone = values.phone || null;
        const location = user.location;
        onSubmit(avatar, fullName, phone, location);
      }}
    >
      {(formik) => (
        <form
          className={style.container}
          onSubmit={(e) => {
            formik.handleSubmit(e);
          }}
        >
          <div className={style.title}>Edit profile</div>

          <div className={style.avatarWrapper}>
            {formik.values.avatar ? (
              <div className={style.avatar}>
                <img src={formik.values.avatar} alt="avatar" />
              </div>
            ) : (
              <Icon
                className={style.avatar}
                name="noAvatar"
                size="120px"
              />
            )}
            <button
              className={style.upload}
              onClick={onUpdatePhoto(
                formik.setFieldValue.bind(null),
                formik.setTouched.bind(null),
              )}
            >
              Upgrade Photo
            </button>
          </div>

          <div className={style.wrapInputs}>
            <div className={style.fullName}>
              <Input
                name="fullName"
                label="full name"
                placeholder="Tony Stark"
                field={formik.getFieldProps('fullName')}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <ErrorInput msg={formik.errors.fullName} />
              ) : null}
            </div>
            <div className={style.phone}>
              <Input
                name="phone"
                label="Phone number"
                type="number"
                placeholder="+380 95 641 111"
                field={formik.getFieldProps('phone')}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <ErrorInput msg={formik.errors.phone} />
              ) : null}
            </div>
            {isError ? (
              <ErrorForm>
                {(err.message[0] + '').toUpperCase() +
                  err.message.slice(1)}
              </ErrorForm>
            ) : (
              ''
            )}
            <SubmiButton
              disabled={Object.keys(formik.touched).length === 0}
              isLoading={isLoading}
              value="Save"
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default observer(EditProfile);
