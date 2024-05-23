export interface User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  gender: 'Male' | 'Female';
  birth: string;
  picture_url: string;
  address_id: number;
  created_at: string;
}

export type ProfileInfo = Pick<User, 'email' | 'nickname' | 'picture_url'>;
