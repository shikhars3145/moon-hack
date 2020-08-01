import React from 'react';

import './ButtonPrimary.scss';

export default function ButtonPrimary({ children, ...btnProps }) {
  return (
    <button className="button-primary" {...btnProps}>
      {children}
    </button>
  );
}
