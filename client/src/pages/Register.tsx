import React from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex space-y-5 flex-col">
        <h1 className="font-semibold text-3xl text-orange-400">Welcome To NIX CV Builder</h1>
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='name'/>
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='email'/>
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='password'/>
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='confirm password'/>

        <div className="flex justify-between items-center">
          <Link className="text-blue-500" to={'/login'}>Already has an account? logIn here</Link>
          <button className="py-1 px-5 text-white bg-blue-800">REGISTER</button>
        </div>
      </div>
    </div>
  );
};
