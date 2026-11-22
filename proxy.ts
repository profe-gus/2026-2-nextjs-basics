import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATH=["/students", "/counter"];
const AUTH_PAGES=["/login", "/register"];

export function proxy(request : NextRequest){
    const {pathname} = request.nextUrl;
    const hasToken = request.cookies.has("token");

    if(!hasToken && PROTECTED_PATH.some((prefix) => pathname.startsWith(prefix))){
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("from", pathname + request.nextUrl.search);
        return NextResponse.redirect(loginUrl);
    }

    if(hasToken && AUTH_PAGES.includes(pathname)){
        return NextResponse.redirect(new URL("/students", request.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher : ["/students/:path*", "/counter", "/login", "/register"]
}