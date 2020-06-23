import React from 'react';

import ErrorInput from '../components/Error/ErrorInput';

export default {
  title: 'ErrorInput',
  msg: 'Error JS',
  component: ErrorInput,
};

export const OneSymbol = () => <ErrorInput msg="E"> </ErrorInput>;

export const ManySymbol = () => (
  <ErrorInput msg="Ivansdadadsddddddddddddddddddddddddddddddddddddddddddd@2"></ErrorInput>
);
