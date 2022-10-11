import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {

  const [formData, setFormData] = useState({
  
    email: '',
    password: '',
  
  });

  const { email, password,  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const login = () => {
    const loginUserObj = {  email, password };

    console.log(loginUserObj);
  };


  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-300">
        <h1 className="font-semibold text-3xl text-primary">Welcome To CV - Builder</h1>
       
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='email' name='email' value={email} onChange={onChange} />
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='password' name='password' value={password} onChange={onChange}/>
       

        <div className="flex justify-between items-center">
          <Link className="text-primary" to={'/register'}>Don't has an account? signUp here</Link>
          <button className="py-1 px-5 text-white bg-primary" onClick={login}>LOGIN</button>
        </div>
      </div>
    </div>
  );
};