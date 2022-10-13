import * as React from 'react';
import { Navigate } from 'react-router-dom';

type PublicRoutesProps = {
  children: JSX.Element;
};

export const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const user = localStorage.getItem('user');

  if (user) {
    return <Navigate to={'/'} />;
  }
  return children;
};
