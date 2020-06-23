import React from 'react';

import SearchForm from '../components/SearchForm/SearchForm.jsx';

const height = '58px';

export default {
  title: 'SearchForm',

  decorators: [
    (story) => (
      <div
        style={{
          paddingLeft: '300px',
          background: '#2aa',
          height: '150vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {story()}
      </div>
    ),
  ],

  component: SearchForm,
};
export const Default = () => <SearchForm height={height} />;
