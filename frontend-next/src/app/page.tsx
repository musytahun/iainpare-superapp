"use client";

import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages {
    backendMessage
    coreMessage
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>GraphQL Data</h1>
      <p>Backend Message: {data.backendMessage}</p>
      <p>Core Message: {data.coreMessage}</p>
    </div>
  );
}
