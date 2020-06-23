import React from 'react';
import { action } from '@storybook/addon-actions';

import RegisterFormComponent from '../components/RegisterForm/RegisterFormComponent.jsx';

export default {
  title: 'RegisterFormComponent',

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

  component: RegisterFormComponent,
};
export const Default = () => (
  <RegisterFormComponent onSubmit={action('onSubmit')} />
);
