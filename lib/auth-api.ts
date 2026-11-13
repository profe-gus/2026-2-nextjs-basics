import "server-only";
import { api } from "./api";

type AuthResponse = {id: string, email: string, token: string};


export async function login(email:string, password:string) {
const {data} = await api.post<AuthResponse>("/user/auth", {email, password});
return data;
}

export async function register(email: string, password: string, fullName:string) {
    const {data} = await api.post<AuthResponse>("/user/signup", {email, password, fullName});
    return data;
}