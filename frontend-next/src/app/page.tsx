"use client";
// halaman ini butuh Apollo hook (client-side), maka harus pakai "use client"

import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

// definisi query GraphQL yang akan dipanggil ke backend
const GET_MESSAGES = gql`
  query GetMessages {
    backendMessage
    coreMessage
  }
`;

export default function HomePage() {
  // eksekusi query pakai hook useQuery
  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>; // state saat query berjalan
  if (error) return <p>Error: {error.message}</p>; // state jika ada error

  // jika sukses, render data dari backend
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>GraphQL Data</h1>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>Backend Message: {data.backendMessage}</p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Core Message: {data.coreMessage}</p>
      </footer>
    </div>
  );
}
