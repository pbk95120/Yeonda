import bcrypt from 'bcrypt';

export const comparePassword = async (password: string, encrypted_password: string): Promise<boolean> => {
  return await bcrypt.compare(password, encrypted_password);
};
