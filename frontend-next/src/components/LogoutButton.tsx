"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { stopSilentRefresh } from "@/lib/silent-refresh";import { ArrowRightOnRectangleIcon } from "@/components/icons/Icons";

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
      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white"
    >
      <ArrowRightOnRectangleIcon className="w-5 h-5" />
      <span>Logout</span>
    </button>
  );
}
