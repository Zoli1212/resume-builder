import React, { Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NoMatch } from './pages/NoMatch';
import { Toaster } from 'react-hot-toast';
import { AuthGuard } from './guards/AuthGuard';

export const  App : React.FC = ()=> {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
      <Route path={'/'} element={<AuthGuard><Home /></AuthGuard>} />
      <Route path={'login'} element={<Login />} />
      <Route path={'register'} element={<Register />} />
      <Route path={'*'} element={<NoMatch />} />
    </Routes>
    </>
  );
};


