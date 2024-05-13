export interface SignupProps {
    nickname: string;
    email: string;
    password: string;
    passwordCheck: string;
    gender: string;
    birth: string;
    picture_url: string | null;
    address:string;
    prefer_gender: string;
    distance: number;
    start_age: number;
    end_age: number;
    tags: string[];
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface verifyData {
    email:string; 
    code:string;
}