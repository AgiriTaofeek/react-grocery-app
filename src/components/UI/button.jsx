import React from 'react';

const button = ({ children, css, type, onClick }) => {
  return (
    <button className={css} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default button;
