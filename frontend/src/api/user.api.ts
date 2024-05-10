import { httpClient } from "./http";
import { LoginProps, LoginResponse, SignupProps, verifyData } from "@/types/user";

export const signup = async (userData:SignupProps) => {
    const response = await httpClient.post("/signup", userData);
    return response.data;
}

export const login = async (data:LoginProps) => {
    const response = await httpClient.post<LoginResponse>("/login", data);
    return response.data;
}

export const resetRequest = async (email:string) => {
    const response = await httpClient.post("/password/reset", {email});
    return response.data;
}

export const resetVerify = async (verifyData:verifyData) => {
    const response = await httpClient.post("/password/verify", verifyData);
    return response.data;
}

export const resetPassword = async (password:string, passwordCheck:string, token:string) => {
    const response = await httpClient.post("/password/reset", {password, passwordCheck, token});
    return response.data;
}