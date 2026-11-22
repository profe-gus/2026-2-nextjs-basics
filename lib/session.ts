import "server-only";
import { cookies } from "next/headers";
import { decodeJwtPayload, SessionUser } from "./jwt";
import { connection } from "next/server";

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

export async function getUserSession(): Promise<SessionUser | null> {
    const token = await getToken();

    const payload = token ? decodeJwtPayload(token) : null;
    if(!payload) return null;
    await connection();
    if(payload.exp * 1000 < Date.now()) return null;
    return { id: payload.id, email: payload.email};
} 