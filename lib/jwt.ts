
export type JwtPayload = { id:string; email:string; exp: number}; 
export type SessionUser = { id:string; email:string };
export function decodeJwtPayload(token: string): JwtPayload | null{
    //header.payload.firma
    const [,payload] = token.split(".");

    if(!payload) return null;

    try{
        const data = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        const valid = 
            typeof data.id === "string" && typeof data.email === "string" && typeof data.exp === "number";
        return valid ? data:null;
    }catch {
        return null;
    }
     
}