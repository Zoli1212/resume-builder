
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordCall } from '../api/api';

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmpassword: ''
  });



  const params = useParams();

  const navigate = useNavigate();

  const { password, confirmpassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const resetPassword = async () => {
    try {
      toast.loading('Loading...');

      const response = await resetPasswordCall(formData.password, params.token);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      } else {
        toast.error('Expired or invalid link');
      }

      toast.dismiss();
    } catch (error) {
      toast.dismiss();

      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-300">
        <h1 className="font-semibold text-3xl text-primary">CHANGE YOUR PASSWORD</h1>

        <input
          type="password"
          className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full"
          placeholder="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <input
          type="password"
          className="py-1 px-3 border-2 border-gray-500 rounded focus:outline-none w-full"
          placeholder="confirm password"
          name="confirmpassword"
          value={confirmpassword}
          onChange={onChange}
        />

        <div className="flex justify-between items-center">
          <button className="py-1 px-5 text-white bg-primary" onClick={resetPassword}>
            RESET PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
};
