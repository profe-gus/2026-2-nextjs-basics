import "server-only";
import { cookies } from "next/headers";

export const TOKEN_COOKIE = "token";
const ONE_HOUR = 60 * 60;

export async function createSession(token: string){
    (await cookies()).set(TOKEN_COOKIE, token, {
        httpOnly : true,
        sameSite: "lax",
        path: "/",
        maxAge: ONE_HOUR
    })
}

export async function deleteSession(){
    (await cookies()).delete(TOKEN_COOKIE);
}

export async function getToken() {
    return (await cookies()).get(TOKEN_COOKIE)?.value;
}