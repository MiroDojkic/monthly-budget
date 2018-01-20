import * as React from 'react';

// Parcel fails to find 'emotion' module for some reason
import s from './style.css';

const Button = ({ children, className, ...rest }) => (
  <button className={`${s.resetChrome} ${className}`} {...rest}>
    {children}
  </button>
);

export default Button;
