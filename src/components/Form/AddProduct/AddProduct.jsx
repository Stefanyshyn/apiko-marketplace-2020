import React, { useCallback } from 'react';
import s from './AddProduct.module.scss';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import confirm from 'reactstrap-confirm';
import { toast } from 'react-toastify';
import yup from '../../../utils/yup';

import ErrorInput from '../components/Error/ErrorInput';
import Input from '../components/Input/Input';
import ErrorForm from '../components/Error/ErrorForm';
import SubmiButton from '../../SubmiButton/SubmiButton';
import InputImages from './components/InputImages/InputImages';
import { useAddProductStore } from '../../../stores/Products/AddProductStore';

const AddProductForm = () => {
  const addProductStore = useAddProductStore();
  const { addProduct } = addProductStore;
  //  console.log(JSON.stringify(addProduct))

  const onSubmit = useCallback(async () => {
    let result = await confirm({
      message: 'Add product?',
      confirmText: 'Confirm',
      confirmColor: 'warning',
      cancelColor: 'link text-danger',
    });
    if (result) {
      await addProduct.run();
      toast.success('The product has been added');
      if (addProduct.isError) toast.error(addProduct.err?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(JSON.stringify(addProduct));
  const { photos } = addProductStore;
  return (
    <Formik
      initialValues={{
        title: addProductStore.title || '',
        description: addProductStore.description || '',
        location: addProductStore.location || '',
        photos: photos,
        price: addProductStore.price || 0,
      }}
      validationSchema={yup.object({
        title: yup
          .string()
          .max(50, 'Title is too long!!')
          .required('Required'),
        location: yup
          .string()
          .max(50, 'Location is too long!!')
          .required('Required'),
        description: yup
          .string()
          .max(255, 'Description is too long!!'),
        price: yup
          .number()
          .max(999999999999, 'Price is too long!!')
          .required('Required'),
        photos: yup.array().required('Required'),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <form
          className={s.container}
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            formik.handleSubmit(e);
          }}
        >
          <div className={s.titleForm}>Add product</div>

          <div className={s.wrapInputs}>
            <div className={s.title}>
              <Input
                name="title"
                label="title"
                placeholder="For example: Iron man suit"
                field={{
                  ...formik.getFieldProps('title'),
                  onChange: (event) => {
                    const { value } = event.target;

                    addProductStore.setTitle(value);
                    formik.handleChange(event);
                  },
                }}
              />
              {formik.touched.title && formik.errors.title ? (
                <ErrorInput msg={formik.errors.title} />
              ) : null}
            </div>

            <div className={s.location}>
              <Input
                name="location"
                label="location"
                placeholder="For examle: Los Angeles, CA"
                field={{
                  ...formik.getFieldProps('location'),
                  onChange: (event) => {
                    const { value } = event.target;

                    addProductStore.setLocation(value);
                    formik.handleChange(event);
                  },
                }}
              />
              {formik.touched.location && formik.errors.location ? (
                <ErrorInput msg={formik.errors.location} />
              ) : null}
            </div>

            <div className={s.description}>
              <Input
                name="description"
                label="description"
                type="textarea"
                placeholder="For example: Iron man suit"
                field={{
                  ...formik.getFieldProps('description'),
                  onChange: (event) => {
                    const { value } = event.target;

                    addProductStore.setDescription(value);
                    formik.handleChange(event);
                  },
                }}
              />
              {formik.touched.description &&
              formik.errors.description ? (
                <ErrorInput msg={formik.errors.description} />
              ) : null}
            </div>

            <div className={s.photos}>
              <InputImages
                photos={formik.values.photos}
                setPhotos={(photos) => {
                  addProductStore.setPhotos(photos);
                  formik.setFieldValue('photos', photos);
                }}
                onDeleteImage={(index) => {
                  const photos = formik.values.photos.filter(
                    (item, i) => i !== index,
                  );

                  formik.setFieldValue('photos', photos);
                  addProductStore.setPhotos(photos);
                }}
              />
              {formik.touched.photos && formik.errors.photos ? (
                <ErrorInput msg={formik.errors.photos} />
              ) : null}
            </div>

            <div className={s.price}>
              <Input
                name="price"
                label="price"
                type="number"
                placeholder="111.99"
                field={{
                  ...formik.getFieldProps('price'),
                  onChange: (event) => {
                    const { value } = event.target;

                    addProductStore.setPrice(+value);
                    formik.handleChange(event);
                  },
                }}
              />
              {formik.touched.price && formik.errors.price ? (
                <ErrorInput msg={formik.errors.price} />
              ) : null}
            </div>

            {addProduct.isError ? (
              <ErrorForm style={{ marginTop: '15px' }}>
                {addProduct.err[0].toUpperCase() +
                  addProduct.err.slice(1)}
              </ErrorForm>
            ) : (
              ''
            )}
            <div className={s.submiButton}>
              <SubmiButton
                disabled={Object.keys(formik.touched).length === 0}
                isLoading={addProduct.isLoading}
                value="Continue"
                style={{ padding: '19px 29px 21px 29px' }}
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default observer(AddProductForm);
