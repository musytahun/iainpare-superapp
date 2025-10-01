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
    <div>
      <h1>GraphQL Data</h1>
      <p>Backend Message: {data.backendMessage}</p>
      <p>Core Message: {data.coreMessage}</p>
    </div>
  );
}
