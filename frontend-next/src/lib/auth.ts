"use client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// --- Ambil waktu exp dari JWT ---
const getTokenExpiry = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp ? decoded.exp * 1000 : null; // ms
  } catch (e) {
    console.error("❌ Gagal decode token:", e);
    return null;
  }
};

// --- Simpan token dengan exp dari backend ---
export const setTokens = (access: string, refresh: string) => {
  const accessExp = getTokenExpiry(access);
  const refreshExp = getTokenExpiry(refresh);

  console.log("🕒 Token exp:", {
    access: accessExp ? new Date(accessExp) : "❓ unknown",
    refresh: refreshExp ? new Date(refreshExp) : "❓ unknown",
  });

  Cookies.set(ACCESS_TOKEN_KEY, access, {
    expires: accessExp ? new Date(accessExp) : 2 / (24 * 60), // fallback 2 menit
  });

  // refresh token hanya diset saat login (tidak di-refresh)
  if (refresh) {
    Cookies.set(REFRESH_TOKEN_KEY, refresh, {
      expires: refreshExp ? new Date(refreshExp) : 7, // default 7 hari
    });
  }

  console.log("✅ Token disimpan ke cookie");
};

// --- Ambil access token dan cek exp ---
export const getAccessToken = () => {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  if (!token) {
    console.warn("🚫 Tidak ada access token di cookie");
    return null;
  }

  const exp = getTokenExpiry(token);
  if (exp && Date.now() > exp) {
    console.warn("⏰ Access token sudah expired");
    return null;
  }

  console.log("🔐 Access token masih valid");
  return token;
};

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);

export const removeTokens = () => {
  console.log("🧹 Menghapus token dari cookie");
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};
