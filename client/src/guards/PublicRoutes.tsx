import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


type PublicRoutesProps =  {
    children: JSX.Element 
}

export const PublicRoutes = ({ children }: PublicRoutesProps) => {

    
        const user = localStorage.getItem('user');


        if(user){
            return <Navigate to={'/'} />;
        }
        return children;
        

    
};