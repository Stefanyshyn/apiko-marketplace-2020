import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './SearchForm.module.scss';
import Icon from '../../../atom/Icon/Icon';
import { Formik } from 'formik';
import yup from '../../../utils/yup';

import InputWithHistoryView from '../../Form/components/InputWithHistory/InputWithHistoryView';
import { historyName } from './SearchFormContainer';

const SearchFormView = ({ height, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        keywords: '',
        location: '',
      }}
      validationSchema={yup.object({
        keywords: yup.string().test(function (value) {
          const { location } = this.parent;
          if (!location) return value != null;
          return true;
        }),
        location: yup.string().test(function (value) {
          const { keywords } = this.parent;
          if (!keywords) return value != null;
          return true;
        }),
      })}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {(formik) => (
        <form
          className={style.containerForm}
          style={{ height: height ? height : '100%' }}
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <div className={style.searchByNameContainer}>
            <InputWithHistoryView
              nameHistory={historyName.keywords}
              name="keywords"
              className={style.searchByName}
              placeholder="Search products by name"
              field={formik.getFieldProps('keywords')}
              setFieldKeywords={formik.setFieldValue.bind(
                null,
                'keywords',
              )}
              style={{
                borderColor:
                  formik.errors.keywords && formik.touched.keywords
                    ? 'red'
                    : 'initial',
              }}
            />
            <div className={style.containerIcon}>
              <Icon
                className={style.icon}
                name="search"
                size="17px"
              />
            </div>
          </div>
          <div className={style.locationContainer}>
            <input
              className={style.location}
              name="location"
              {...formik.getFieldProps('location')}
              placeholder="Location"
              style={
                formik.errors.location && formik.touched.location
                  ? { borderColor: 'red' }
                  : { borderColor: 'initial' }
              }
            />
            <div className={style.containerIcon}>
              <Icon
                className={style.icon}
                name="location"
                size="13px"
              />
            </div>
          </div>
          <input type="submit" value="Search" />
        </form>
      )}
    </Formik>
  );
};

export default SearchFormView;
