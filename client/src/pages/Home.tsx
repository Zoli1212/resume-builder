import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../types/types';

export const Home = () => {
  const [userInfo, setUserInfo] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const getData = async () => {
    toast.loading('Loading...');
    try {
      const userToken = localStorage.getItem('user');
      let token;
      if (userToken) {
        token = JSON.parse(userToken);
      }
      const response = await axios.get('/api/user/get-user-info', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.dismiss();
      if (response.data.success) {
        console.log(response.data.data, '!');
        setUserInfo((prevState) => {
          return { ...prevState, name: response.data.data.name, email: response.data.data.email };
        });
      } else {
        localStorage.removeItem('user');
        navigate('/login');
        toast.error('Something went wrong');
      }
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/login');
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (userInfo.name === '') {
      getData();
    }
  }, [userInfo]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/06/infographic-resume-template-header.png"
        className="p-1 bg-white border rounded max-w-sm"
        alt="..."
      />
      <div className="flex flex-col space-y-5">
        <h1 className="text-5xl font-semibold text-primary">{userInfo.name}</h1>
        <h1 className="text-5xl font-semibold text-primary">{userInfo.email}</h1>
        <button
          className="border border-primary px-10 py-2 text-primary max-w-max"
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};
