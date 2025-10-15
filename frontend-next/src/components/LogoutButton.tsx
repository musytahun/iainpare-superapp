"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { stopSilentRefresh } from "@/lib/silent-refresh";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    stopSilentRefresh();
    router.push("/gate/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
