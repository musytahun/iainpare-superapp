import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const isAuthPage = 
    req.nextUrl.pathname.startsWith("/login") || 
    req.nextUrl.pathname.startsWith("/register");

  // Jika belum login dan bukan halaman auth → redirect ke /login
  if (
    !token && 
    !isAuthPage && 
    (req.nextUrl.pathname.startsWith("/dashboard") 
    || req.nextUrl.pathname.startsWith("/users"))
  ) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Jika sudah login dan buka /login → redirect ke dashboard
  if (token && isAuthPage) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login", 
    "/register",
    "/dashboard/:path*", 
    "/users/:path*", 
  ],
};
