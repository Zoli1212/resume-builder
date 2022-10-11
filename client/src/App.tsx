import React, { Suspense} from 'react';
import logo from './logo.svg';
import './App.css'
import { Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NoMatch } from './pages/NoMatch';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'login'} element={<Login />} />
      <Route path={'register'} element={<Register />} />
      <Route path={'*'} element={<NoMatch />} />
    </Routes>
  );
}

export default App;
