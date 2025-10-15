"use client";

import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { startSilentRefresh } from "@/lib/silent-refresh";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startSilentRefresh();
  }, []);
  return (
    <html lang="en">
      <body>
        {/* Bungkus dengan ApolloProvider agar useQuery & useMutation bisa dipakai */}
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
