import { User } from './../types/types';
import axios from 'axios';
import { NewUser, AuthResponse } from '../types/types';


export async function register(newUser: NewUser) :Promise<AuthResponse>{

    return await axios.post('api/auth/register', newUser);
}


export async function login(loginUser: User) :Promise<AuthResponse>{

    return await axios.post('api/auth/login', loginUser);
}