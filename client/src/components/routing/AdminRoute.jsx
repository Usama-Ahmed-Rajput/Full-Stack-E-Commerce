import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading, initialCheckDone } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!initialCheckDone && loading) {
    return <Loader text="Verifying admin credentials..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
