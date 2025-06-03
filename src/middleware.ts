
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET  // Secret zaroor dena
  });
  const url = request.nextUrl;

  const isAuthPage = url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up');
  const isProtectedRoute = url.pathname.startsWith('/dashboard');

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // console.log("Middleware Token:", token);

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/verify/:path*',
    '/sign-in',
    '/sign-in/:path*',
    '/sign-up',
    '/sign-up/:path*',
  ],
};
