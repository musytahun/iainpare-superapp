import "./globals.css";
import { ApolloWrapper } from "../lib/apollo-provider";

// RootLayout adalah layout global Next.js (App Router)
// Semua halaman akan dibungkus oleh ApolloWrapper di sini
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
