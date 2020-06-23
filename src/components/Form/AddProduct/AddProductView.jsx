import React from 'react';
import s from './AddProduct.module.scss';
import { Formik } from 'formik';
import ErrorInput from '../components/Error/ErrorInput';
import Input from '../components/Input/Input';
import ErrorForm from '../components/Error/ErrorForm';
import SubmiButton from '../../SubmiButton/SubmiButton';
import yup from '../../../utils/yup';
import InputImages from '../components/InputImages/InputImages';

const AddProductView = (props) => {
  const {
    onSubmit,

    addProductsFields,
    changeAddProductField,

    fetchAddProduct,
  } = props;
  return (
    <Formik
      initialValues={{
        title: addProductsFields.title,
        description: addProductsFields.description,
        location: addProductsFields.location,
        photos: addProductsFields.photos,
        price: addProductsFields.price,
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
      onSubmit={(values) => {
        const body = {
          title: values.title || null,
          location: values.location || null,
          description: values.description || null,
          photos: values.photos || null,
          price: values.price || null,
        };
        onSubmit(body);
      }}
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

                    changeAddProductField('title', value);
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

                    changeAddProductField('location', value);
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

                    changeAddProductField('description', value);
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
                  changeAddProductField(
                    'photos',
                    formik.values.photos,
                  );
                  formik.setFieldValue('photos', photos);
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

                    changeAddProductField('price', value);
                    formik.handleChange(event);
                  },
                }}
              />
              {formik.touched.price && formik.errors.price ? (
                <ErrorInput msg={formik.errors.price} />
              ) : null}
            </div>

            {fetchAddProduct.isError ? (
              <ErrorForm style={{ marginTop: '15px' }}>
                {(
                  String(fetchAddProduct.error.message)[0] + ''
                ).toUpperCase() +
                  String(fetchAddProduct.error.message).slice(1)}
              </ErrorForm>
            ) : (
              ''
            )}
            <div className={s.submiButton}>
              <SubmiButton
                disabled={Object.keys(formik.touched).length === 0}
                isLoading={fetchAddProduct.isLoading}
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

export default AddProductView;
