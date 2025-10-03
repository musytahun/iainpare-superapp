"use client"; // directive khusus Next.js App Router agar file ini dieksekusi di client-side

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Membuat instance Apollo Client yang akan dipakai di seluruh app
export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // URL endpoint GraphQL, diambil dari environment variable
    credentials: "include", // kalau pakai cookie/session
  }),
  cache: new InMemoryCache(), // cache bawaan Apollo agar query tidak selalu fetch ulang
});

