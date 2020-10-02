import React, { useCallback } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { observer } from 'mobx-react';

import style from './SearchForm.module.scss';
import Icon from '../../../atom/Icon/Icon';
import yup from '../../../utils/yup';
import InputWithHistoryView from '../components/InputWithHistory/InputWithHistory';
import { inputHints } from '../../../service/localStorage';
import { useWantedProductStore } from '../../../stores/Products/WantedProductsStore';
import { routes } from '../../../scenes/router';
const nameHistory = {
  keywords: 'input-keywords',
};

const SearchForm = ({ height }) => {
  const wantedProducts = useWantedProductStore();
  const history = useHistory();

  const onSubmit = useCallback(async (values) => {
    //adds keywords to local storage for keywords input history
    inputHints.setHints({
      nameHistory: nameHistory.keywords,
      hint: values.keywords,
    });
    await wantedProducts.fetch.run({
      keywords: values.keywords,
      location: values.location,
    });
    const params = {};
    if (values.keywords) params.keywords = values.keywords;
    if (values.location) params.location = values.location;
    if (wantedProducts.priceFrom)
      params.priceFrom = wantedProducts.priceFrom;
    if (wantedProducts.priceTo)
      params.priceTo = wantedProducts.priceTo;
    history.push(generatePath(routes.wantedProduct, params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              nameHistory={nameHistory.keywords}
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

export default observer(SearchForm);
