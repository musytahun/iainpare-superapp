"use client";

import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
