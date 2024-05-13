import { httpClient } from './http';
import { LoginProps, SignupProps, verifyData } from '@/types/user';

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post('/signup', userData);
  return response.data;
};

export const signupEmail = async (email: string) => {
  const response = await httpClient.post('/signup/email', { email });
  return response.data;
};

export const verifyEmail = async (email: string, code: string) => {
  const response = await httpClient.post('/signup/email/verify', { email, code });
  return response.data;
};

export const login = async (data: LoginProps) => {
  const response = await httpClient.post('/login', data);
  return response.data;
};

export const logout = async () => {
  const response = await httpClient.post('/logout');
  return response.data;
};

export const resetRequest = async (email: string) => {
  const response = await httpClient.post('/password/reset', { email });
  return response.data;
};

export const resetVerify = async (verifyData: verifyData) => {
  const response = await httpClient.post('/password/verify', verifyData);
  return response.data;
};

export const resetPassword = async (password: string, passwordCheck: string, token: string) => {
  const response = await httpClient.post('/password/confirm', { password, passwordCheck, token });
  return response.data;
};
