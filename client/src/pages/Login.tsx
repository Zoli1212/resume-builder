import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { login, sendForgotPasswordLink } from '../api/api';
import { useNavigate} from 'react-router-dom';

export const Login = () => {
  
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
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

  const sendResetPasswordLink = async () => {
    try {
      toast.loading('Loading...');
      const response = await sendForgotPasswordLink(formData.email);
      toast.dismiss();
      if (response.data.success) {
        
        toast.success(response.data.message);
        setShowForgotPassword(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('something went wrong');
    }
  };


  

  return (
    <div className="flex justify-center items-center h-screen">
      {!showForgotPassword ?  (<div className="w-[400px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-300">
      <img
    src="https://pepperdine.starrezhousing.com/StarRezPortalX/File/GetImage?imageName=Login%20Here.png&tableName=PortalPageWidget&tableID=100&dateCreatedTicks=637457199798410716&hash=0DAFD659"
    className="p-1 bg-white border rounded max-w-sm"
    alt="..."
    />
        

        <h1 className="font-semibold text-3xl text-primary">Welcome To CV - Builder</h1>
       
        <input type="text" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='email' name='email' value={email} onChange={onChange} />
        <input type="password" className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full" placeholder='password' name='password' value={password} onChange={onChange}/>
       

        <div className="flex justify-between items-center">
          <div className="flex flex-col">

          <Link className="text-primary" to={'/register'}>Don't has an account? signUp here</Link>
          <h1 className="underline text-primary cursor-pointer" onClick={()=> setShowForgotPassword(true)}>Forgot password?</h1>
          </div>
          <button className="py-1 px-5 text-white bg-primary" onClick={loginUser}>LOGIN</button>
        </div>
      </div> ): (
          <div className="flex flex-col space-y-5 w-[400px]">
          <h1 className="font-semibold text-3xl text-primary">
            Enter your email
          </h1>
          <input
            type="text"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            name="email"
            placeholder="email"
            onChange={onChange}
            value={email}
          />
          <div className="flex flex-col justify-between items-end space-y-5">
            <button
              className="py-1 px-5 text-white bg-primary w-full"
              onClick={sendResetPasswordLink}
            >
              SEND RESET PASSWORD LINK
            </button>
            <h1
              onClick={() => setShowForgotPassword(false)}
              className="cursor-pointer underline text-md text-primary text-left"
            >
              Click Here To Login
            </h1>
          </div>
        </div>
      )}
    </div>
  );
  
};
