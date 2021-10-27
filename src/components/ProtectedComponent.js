import React from 'react';
import { Route } from "react-router-dom";

const ProtectedComponent = ({ component: Component, ...props  }) => {
  return (
    props.loggedIn && <Component {...props} />
)}

export default ProtectedComponent;
