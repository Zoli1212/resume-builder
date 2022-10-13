import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { login } from '../api/api';
import { useNavigate} from 'react-router-dom';

export const Login = () => {
  
  const navigate = useNavigate();
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


  const loginUser = async () => {
    const loginUserObj = {  email, password };

    try{

      toast.loading('Loading...');

      const response = await login(loginUserObj);

      toast.dismiss();
      console.log(response);

      if(response.data.success){
        toast.success(response.data.message);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        navigate('/');
      }else{
        console.log('here');
        toast.error(response.data.message);
      }
    }catch(error){

      toast.dismiss();

      toast.error('Something went wrong');

    }

  };


  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-300">
        <h1 className="font-semibold text-3xl text-primary">Welcome To CV - Builder</h1>
       
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='email' name='email' value={email} onChange={onChange} />
        <input type="password" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='password' name='password' value={password} onChange={onChange}/>
       

        <div className="flex justify-between items-center">
          <Link className="text-primary" to={'/register'}>Don't has an account? signUp here</Link>
          <button className="py-1 px-5 text-white bg-primary" onClick={loginUser}>LOGIN</button>
        </div>
      </div>
    </div>
  );
};
