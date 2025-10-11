// components/Permission.tsx
"use client";

import { ReactNode } from "react";
import { can } from "@/lib/permissions";

interface PermissionProps {
  check: string | string[]; // bisa 1 atau lebih permission
  children: ReactNode;
  fallback?: ReactNode; // optional: tampilkan alternatif kalau tidak punya izin
}

/**
 * Komponen wrapper untuk kontrol tampilan berbasis permission
 * Contoh:
 * <Permission check="user.update"><Button>Edit</Button></Permission>
 */
export default function Permission({ check, children, fallback = null }: PermissionProps) {
  const requiredPermissions = Array.isArray(check) ? check : [check];
  const allowed = requiredPermissions.some((perm) => can(perm));

  if (!allowed) {
    return <>{fallback}</>; // misalnya null atau teks "Tidak punya izin"
  }

  return <>{children}</>;
}

// contoh fallback
// <Permission check="user.delete" fallback={<p className="text-sm text-gray-400">Tidak punya izin hapus</p>}>
//   <Button variant="destructive">Hapus</Button>
// </Permission>