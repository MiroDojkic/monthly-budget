import React from "react";

const Plus = props => (
  <svg
    width={25}
    height={25}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <use xlinkHref="#path0_fill" fill="#FFF" />
    <defs>
      <path
        id="path0_fill"
        d="M23.438 10.938h-9.375V1.562C14.063.625 13.437 0 12.5 0c-.938 0-1.563.625-1.563 1.563v9.374H1.563C.625 10.938 0 11.563 0 12.5c0 .938.625 1.563 1.563 1.563h9.374v9.374c0 .938.626 1.563 1.563 1.563.938 0 1.563-.625 1.563-1.563v-9.375h9.374c.938 0 1.563-.624 1.563-1.562 0-.938-.625-1.563-1.563-1.563z"
      />
    </defs>
  </svg>
);

export default Plus;
