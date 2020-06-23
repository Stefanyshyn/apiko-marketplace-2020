import React from 'react';

import Icon from '../components/Icon/Icon.jsx';

const size = '40px';

export default {
  title: 'Icon',
  name: 'eye',
  size: { size },
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
  component: Icon,
};
export const Eye = () => <Icon name="eye" size={size} />;
export const Logo = () => <Icon name="logo" size={size} />;
export const LogoLight = () => <Icon name="logoLight" size={size} />;
export const Heart = () => <Icon name="heart" size={size} />;
export const HeartLight = () => (
  <Icon name="heartLight" size={size} />
);
export const Search = () => <Icon name="search" size={size} />;
export const Location = () => <Icon name="location" size={size} />;
