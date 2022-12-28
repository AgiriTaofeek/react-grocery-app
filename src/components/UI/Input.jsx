import React from 'react';

const Input = ({ css, type, place, val, onChange }) => {
  return (
    <input
      className={css}
      type={type}
      placeholder={place}
      value={val}
      onChange={onChange}
    />
  );
};

export default Input;
