"use client";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "@/lib/auth";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  const activeModule = localStorage.getItem("activeModule");
  const activeRole = localStorage.getItem("activeRole");

  if (token && activeModule && activeRole) {
    console.log("🔑 ApolloClient: Token, activeModule, activeRole disertakan di header");
  } else {
    console.warn("⚠️ ApolloClient: Token tidak ditemukan");
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      "X-Active-Module": activeModule || "",
      "X-Active-Role": activeRole || "",
    },
  };
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
