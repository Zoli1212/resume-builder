import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { register } from '../api/api';
import {  User } from '../types/types';

export const Register = () => {

  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const registerUser = async () => {

    if(password === confirmPassword){

      const userObj = { name, email, password, confirmPassword} as User;
      try{
        toast.loading('Loading...');

        const response = await register(userObj);

        toast.dismiss();


        if(response.data.success){
          toast.success(response.data.message);
        }else{
          toast.error(response.data.message);
        }
      }catch(error){
        toast.dismiss();

        toast.error('Email already in use');

      }
    }else{

      toast.error('Passwords did not match!');

    }
    
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-300">
      <div className="flex flex-wrap justify-center">
    <img
    src="https://st.depositphotos.com/1008768/3377/i/600/depositphotos_33777219-stock-photo-register-here-sign.jpg"
    className="p-1 bg-white border rounded max-w-sm"
    alt="..."
    />
</div>
        <h1 className="font-semibold text-3xl text-primary">Welcome To CV - Builder</h1>
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='name' name='name' value={name} onChange={onChange}/>
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='email' name='email' value={email} onChange={onChange} />
        <input type="password" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='password' name='password' value={password} onChange={onChange}/>
        <input type="password" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='confirm password' name='confirmPassword' value={confirmPassword} onChange={onChange}/>

        <div className="flex justify-between items-center">
          <Link className="text-primary" to={'/login'}>Already has an account? logIn here</Link>
          <button className="py-1 px-5 text-white bg-primary" onClick={registerUser}>REGISTER</button>
        </div>
      </div>
    </div>
  );
};
