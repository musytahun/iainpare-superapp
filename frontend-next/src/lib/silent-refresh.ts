"use client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setTokens, removeTokens } from "./auth";

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

export const startSilentRefresh = () => {
  const token = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  if (!token || !refreshToken) {
    console.warn("⚠️ Silent refresh: token tidak ditemukan");
    return;
  }

  try {
    const { exp }: any = jwtDecode(token);
    const now = Date.now() / 1000;
    const sisa = exp - now;

    const refreshIn = Math.max((sisa - 60) * 1000, 0);
    console.log(`⏰ Silent refresh dijadwalkan ${Math.round(refreshIn / 1000)} detik lagi`);

    if (refreshTimeout) clearTimeout(refreshTimeout);

    refreshTimeout = setTimeout(async () => {
      console.log("🔁 Silent refresh berjalan...");

      try {
        const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              mutation RefreshToken($refreshToken: String!) {
                refreshToken(refreshToken: $refreshToken) {
                  accessToken
                }
              }
            `,
            variables: { refreshToken },
          }),
        });

        const data = await res.json();
        console.log("🧾 Response refresh:", data);

        const newAccess = data?.data?.refreshToken?.accessToken;
        if (!newAccess) throw new Error("Access token baru tidak diterima");

        // gunakan refresh token lama (tidak diperbarui)
        setTokens(newAccess, refreshToken);
        console.log("✅ Silent refresh sukses");

        // jadwalkan ulang
        startSilentRefresh();
      } catch (err) {
        console.error("❌ Silent refresh gagal:", err);
        removeTokens();
        window.location.href = "/gate/login";
      }
    }, refreshIn);
  } catch (err) {
    console.error("⚠️ Gagal decode token di silent refresh:", err);
  }
};

export const stopSilentRefresh = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    console.log("🛑 Silent refresh dihentikan");
  }
};
