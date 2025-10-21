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
  // Settings
  "/settings": { permissions: ["modul.settings"] },
  "/settings/users": { permissions: ["user.view"] },
  "/settings/users/create": { permissions: ["user.create"] },
  "/settings/users/update": { permissions: ["user.update"] },
  "/settings/users/delete": { permissions: ["user.delete"] },
  "/settings/roles": { permissions: ["role.view"] },
  "/settings/roles/create": { permissions: ["role.create"] },
  "/settings/roles/update": { permissions: ["role.update"] },
  "/settings/roles/delete": { permissions: ["role.delete"] },
  "/settings/permissions": { permissions: ["permission.view"] },
  "/settings/permissions/create": { permissions: ["permission.create"] },
  "/settings/permissions/update": { permissions: ["permission.update"] },
  "/settings/permissions/delete": { permissions: ["permission.delete"] },
  "/settings/modules": { permissions: ["module.view"] },
  "/settings/modules/create": { permissions: ["module.create"] },
  "/settings/modules/update": { permissions: ["module.update"] },
  "/settings/modules/delete": { permissions: ["module.delete"] },
};

export function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access_token")?.value;
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;
  const isAuthPage = path.startsWith("/gate/login") || path.startsWith("/gate/register");

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
    "/gate/menu", 
    "/settings", 
    "/settings/:path*", 
  ],
};
