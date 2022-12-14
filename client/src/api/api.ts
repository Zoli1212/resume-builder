import axios from 'axios';
import { User, AuthResponse } from '../types/types';

export async function register(newUser: User): Promise<AuthResponse> {
  return await axios.post('api/auth/register', newUser);
}

export async function login(loginUser: User): Promise<AuthResponse> {
  return await axios.post('api/auth/login', loginUser);
}

export async function verifyTokenCall(token: string): Promise<AuthResponse> {
  return await axios.post('/api/auth/verifyemail', { token });
}

export async function resetPasswordCall(password: string, token: string): Promise<AuthResponse> {
  return axios.post('/api/auth/resetpassword', { password, token });
}

export async function sendForgotPasswordLink(email: string): Promise<AuthResponse> {
  return axios.post('/api/auth/send-reset-password-link', {
    email
  });
}

export async function getUserInfoCall(token: string) : Promise<AuthResponse> {

  return await axios.get('/api/user/get-user-info', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

}
