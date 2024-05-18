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
