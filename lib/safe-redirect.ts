const BASE = "http://internal.invalid";

export function safeRedirectPath(value: unknown, fallback="/students"){
    const raw = String(value ?? "");
    if(!raw.startsWith("/")) return fallback;

    try{
        const url = new URL(raw, BASE);
        if(url.origin !== BASE) return fallback;

        return url.pathname + url.search + url.hash;
    }catch(error){
        return fallback
    }
}