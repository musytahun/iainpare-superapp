"use client";
import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); // 1 hari
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};
