import React from 'react';

const Loader = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="8" fill="none">
      <animate attributeName="stroke-dasharray" dur="2s" from="0, 251.327" to="251.327, 0" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" dur="2s" from="0" to="-502.654" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default Loader;
