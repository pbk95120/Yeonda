import { httpClient } from './http';
import { LoginProps, SignupProps, resetPasswordData, verifyData } from '@/types/user';

export const signup = async (formData: FormData) => {
  const response = await httpClient.post('/signup', formData, {
    headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8' },
  });
  return response.data;
};

export const signupEmail = async (email: string) => {
  const response = await httpClient.post('/signup/email', { email });
  return response.data;
};

export const verifyEmail = async ({ email, code }: verifyData) => {
  const response = await httpClient.post('/signup/email/verify', { email, code });
  return response.data;
};

export const login = async (data: LoginProps) => {
  const response = await httpClient.post('/login', data);
  return response.data;
};

export const refreshToken = async () => {
  const response = await httpClient.post('/login/refresh');
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

export const resetVerify = async ({ email, code }: verifyData) => {
  const response = await httpClient.post('/password/reset/verify', { email, code });
  return response.data;
};

export const resetPassword = async ({ password, password_check }: resetPasswordData) => {
  const response = await httpClient.post('/password/reset/confirm', { password, password_check });
  return response.data;
};
