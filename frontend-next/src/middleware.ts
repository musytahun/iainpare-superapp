import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  user_id: number;
  username: string;
  roles?: string[];
  permissions?: string[];
  exp?: number;
}

// 🔒 Daftar aturan akses
const ACCESS_RULES: Record<string, { roles?: string[]; permissions?: string[] }> = {
  "/admin": { roles: ["admin"] },
  "/users": { permissions: ["user.view"] },
  "/users/create": { permissions: ["user.create"] },
  "/users/update": { permissions: ["user.update"] },
  "/users/delete": { permissions: ["user.delete"] },
  "/roles": { permissions: ["role.view"] },
  "/permissions": { permissions: ["permission.view"] },
};

export function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access_token")?.value;
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;
  const isAuthPage = path.startsWith("/gate/login") || path.startsWith("/register");

  // Belum login → redirect ke /login
  if (!access_token && !isAuthPage) {
    url.pathname = "/gate/login";
    return NextResponse.redirect(url);
  }

  // Sudah login → tidak boleh ke /login /register
  if (access_token && isAuthPage) {
    url.pathname = "/gate/menu";
    return NextResponse.redirect(url);
  }


  // Jika ada token → cek role & izin
  if (access_token) {
    try {
      const decoded = jwtDecode<JwtPayload>(access_token);
      const { roles = [], permissions = [] } = decoded;

      // Jangan logout otomatis kalau token expired.
      // Biarkan frontend (Apollo refreshLink) yang tangani perpanjangan token.
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired — menunggu refresh dari frontend");
        return NextResponse.next();
      }

      // Cek semua aturan yang cocok dengan path
      for (const [route, rule] of Object.entries(ACCESS_RULES)) {
        if (path.startsWith(route)) {
          // Cek role
          if (rule.roles && !rule.roles.some((r) => roles.includes(r))) {
            url.pathname = "/403";
            return NextResponse.rewrite(url);
          }

          // Cek permission
          if (rule.permissions && !rule.permissions.some((p) => permissions.includes(p))) {
            url.pathname = "/403";
            return NextResponse.rewrite(url);
          }
        }
      }
    } catch (error) {
      console.error("JWT invalid:", error);
      url.pathname = "/gate/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/gate/login", 
    "/gate/register",
    "/gate/menu/:path*", 
    "/roles/:path*", 
    "/permissions/:path*",
    "/users/:path*", 
  ],
};
