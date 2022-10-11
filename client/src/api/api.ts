import axios from 'axios';
import { NewUser, RegistrationResponse } from '../types/types';


export async function register(newUser: NewUser) :Promise<RegistrationResponse>{

    return await axios.post('api/auth/register', newUser);
}