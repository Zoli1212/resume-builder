import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NoMatch } from './pages/NoMatch';
import { Toaster } from 'react-hot-toast';
import { AuthGuard } from './guards/AuthGuard';
import { PublicRoutes } from './guards/PublicRoutes';
import { VerifyEmail } from './pages/VerifyEmail';
import { ResetPassword } from './pages/ResetPassword';

export const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path={'/'}
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path={'login'}
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path={'register'}
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path={'verifyemail/:token'}
          element={
            <PublicRoutes>
              <VerifyEmail />
            </PublicRoutes>
          }
        />
        <Route
          path={'resetpassword/:token'}
          element={
            <PublicRoutes>
              <ResetPassword />
            </PublicRoutes>
          }
        />
        <Route path={'*'} element={<NoMatch />} />
      </Routes>
    </>
  );
};
