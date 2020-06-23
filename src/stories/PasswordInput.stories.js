import React from 'react';

import PasswordInput from '../components/PasswordInput/PasswordInput.jsx';

const width = '30%';

export default {
  title: 'PasswordInput',

  decorators: [
    (story) => (
      <div
        style={{
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

  component: PasswordInput,
};
export const Default = () => <PasswordInput width={width} />;
