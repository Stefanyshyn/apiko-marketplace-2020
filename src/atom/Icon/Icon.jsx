import React from 'react';

import iconConfig from '../../utils/iconConfig';

const Icon = ({ name, ...props }) => {
  const IconConfig = iconConfig[name];
  return <IconConfig {...props} />;
};
export default Icon;
