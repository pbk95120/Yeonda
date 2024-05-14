export interface SignupProps {
  nickname: string;
  email: string;
  password: string;
  password_check: string;
  gender: string;
  birth: string;
  picture_url: File | string | null;
  address: string;
  prefer_gender: string;
  distance: string;
  start_age: string;
  end_age: string;
  tags: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface verifyData {
  email: string;
  code: string;
}

export interface resetPasswordData {
  password: string;
  password_check: string;
}
