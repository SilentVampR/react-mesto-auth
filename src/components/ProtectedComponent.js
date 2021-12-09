import React from 'react';

const ProtectedComponent = ({ component: Component, ...props  }) => {
  return (
    props.loggedIn && <Component {...props} />
)}

export default ProtectedComponent;
