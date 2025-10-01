// komponen provider khusus supaya bisa dipakai di layout.tsx
"use client"; // provider harus dijalankan di client-side agar hook Apollo bisa dipakai

import { ApolloProvider } from "@apollo/client/react";
import { client } from "./apollo-client";

// Komponen wrapper untuk membungkus seluruh aplikasi dengan ApolloProvider
// sehingga semua komponen anak bisa pakai useQuery/useMutation tanpa setup ulang
export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
