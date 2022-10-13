import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { verifyTokenCall } from '../api/api';
import { toNamespacedPath } from 'node:path/win32';

export const VerifyEmail = () => {


    const [emailVerified, setEmailVerified] = useState<string>('');

    const params = useParams();


    const verifyToken = async() => {
        try{

            toast.loading('Loading...');


            const response =await verifyTokenCall(params.token);

            if(response.data.success){
                setEmailVerified('true');
            }else{
                setEmailVerified('false');
            }

            toast.dismiss();


        }catch(error){
            toast.dismiss();
            setEmailVerified('false');
        }
    };
    useEffect(() => {


        verifyToken();

    }, []);


  return (
    <div className="flex min-h-screen p-5 justify-center items-center">
        {emailVerified === '' && <h1 className='text-primary text-4xl'>Please wait for processing email verification</h1>}
        {emailVerified === 'true' && <h1 className='text-primary text-4xl'>Your email verified successfully</h1>}
        {emailVerified === 'false'  && <h1 className='text-primary text-4xl'>Invalid or expired token</h1>}


    </div>
  );
};
