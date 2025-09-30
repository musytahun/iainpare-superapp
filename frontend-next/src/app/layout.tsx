// frontend-web/src/app/layout.tsx
import "./globals.css";
import { ApolloWrapper } from "../lib/apollo-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
