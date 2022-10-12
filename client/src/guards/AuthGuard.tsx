import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


type AuthGuardProps =  {
    children: JSX.Element 
}

export const AuthGuard  = ({ children }: AuthGuardProps) => {

    
        const user = localStorage.getItem('user');


        if(!user || user !== ''){
            return <Navigate to={'/login'} />;
        }

        return children;

    
};
