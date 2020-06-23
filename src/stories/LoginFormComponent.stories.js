import React from 'react';
import { action } from '@storybook/addon-actions';

import LoginFormComponent from '../components/LoginForm/LoginFormComponent.jsx';

export default {
  title: 'LoginFormComponent',

  decorators: [
    (story) => (
      <div
        style={{
          background: '#2aa',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {story()}
      </div>
    ),
  ],

  component: LoginFormComponent,
};
export const Default = () => (
  <LoginFormComponent onSubmit={action('onSubmit')} />
);
