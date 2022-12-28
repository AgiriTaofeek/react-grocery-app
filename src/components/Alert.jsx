import React, { useEffect } from 'react';

const Alert = ({ type, msg, onCleanUp, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onCleanUp(); //* Reason why we set the default value of show to false
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };

    //* I didn't add any array of dependency because i want it run anytime the Alert component is rendered. from the App component, it is only rendered when we set the alert.show value to true
  }); //* or add [list]
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
