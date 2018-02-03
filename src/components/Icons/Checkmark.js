import React from "react";

const Checkmark = props => (
  <svg width={20} height={20} {...props}>
    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
  </svg>
);

export default Checkmark;
