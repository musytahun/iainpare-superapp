import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  user_id: number;
  username: string;
  role?: string;
  permissions?: string[];
  exp?: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;
  const isAuthPage = 
    path.startsWith("/login") || 
    path.startsWith("/register");

  // Jika belum login dan bukan halaman auth → redirect ke /login
  if (!token && !isAuthPage) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Jika sudah login dan buka /login → redirect ke dashboard
  if (token && isAuthPage) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }


  // Jika ada token → cek role & izin
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      // Role-based routing
      if (path.startsWith("/admin") && decoded.role !== "admin") {
        url.pathname = "/403";
        return NextResponse.rewrite(url);
      }

      if (path.startsWith("/users") && !decoded.permissions?.includes("user.view")) {
        url.pathname = "/403";
        return NextResponse.rewrite(url);
      }

    } catch (error) {
      console.error("JWT invalid:", error);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login", 
    "/register",
    "/dashboard/:path*", 
    "/users/:path*", 
    "/admin/:path*",
  ],
};
