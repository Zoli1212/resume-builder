import axios from 'axios';
import { User, AuthResponse } from '../types/types';


export async function register(newUser: User) :Promise<AuthResponse>{

    return await axios.post('api/auth/register', newUser);
}


export async function login(loginUser: User) :Promise<AuthResponse>{

    return await axios.post('api/auth/login', loginUser);
}

export async function verifyTokenCall(token: any): Promise<AuthResponse> {

    return await axios.post('/api/auth/verify-email', {token});
    
}