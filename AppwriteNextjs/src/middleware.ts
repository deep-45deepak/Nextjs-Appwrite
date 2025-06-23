import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    // Check if the request is for a public path
    const isPublicPath = [
        '/',
        '/login',
        '/signup',
        'verifyemail',
    ].includes(path);

    const token = request.cookies.get('token')?.value || '';

    if(token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }
    if(!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/verifyemail',
    ]
};
