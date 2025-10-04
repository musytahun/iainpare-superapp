"use client";

import { useQuery } from "@apollo/client";
import { GET_USER_BY_USERNAME } from "../../../graphql/queries";

export default function UsersPage() {
  // Ambil user dengan username "john_doe"
  const { data, loading, error } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: "john_doe" },
  });

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.userByUsername;

  return (
    <div>
      <h1>User Detail</h1>
      {user ? (
        <ul>
          <li>ID: {user.id}</li>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>Full Name: {user.fullName}</li>
        </ul>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}
