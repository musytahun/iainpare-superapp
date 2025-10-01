"use client"; // directive khusus Next.js App Router agar file ini dieksekusi di client-side

import { ApolloClient, InMemoryCache } from "@apollo/client";

// Membuat instance Apollo Client yang akan dipakai di seluruh app
export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // URL endpoint GraphQL, diambil dari environment variable
  cache: new InMemoryCache(), // cache bawaan Apollo agar query tidak selalu fetch ulang
});
