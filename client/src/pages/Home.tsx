import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {


    const userItem = localStorage.getItem('user');

    const navigate = useNavigate();


    useEffect(() => {

        if(!userItem){

            navigate('/login');

        }

        else{
            const user = JSON.parse(userItem);
    
        }
    });





  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className="text-5xl font-semibold text-primary">
            Home

        </div>
    </div>
  );
};
