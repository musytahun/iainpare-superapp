// lib/permissions.ts
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  user_id: number;
  username: string;
  roles?: string[];
  permissions?: string[];
}

export const getUserPermissions = (): string[] => {
  const token = Cookies.get("access_token");
  if (!token) return [];
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.permissions || [];
  } catch {
    return [];
  }
};

export const can = (permission: string) => {
  const permissions = getUserPermissions();
  return permissions.includes(permission);
};
