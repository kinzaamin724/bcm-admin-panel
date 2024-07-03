import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const token = localStorage.getItem("token");
    return <div>{token ? <Navigate to="/home" /> : children}</div>;
}

export default PublicRoute;