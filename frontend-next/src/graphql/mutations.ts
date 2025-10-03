import { gql } from "@apollo/client";

// Mutation untuk create user
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $fullName: String) {
    createUser(username: $username, password: $password, email: $email, fullName: $fullName) {
      id
      username
      email
      fullName
    }
  }
`;

// Mutation untuk update user
export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $username: String!, $email: String!, $fullName: String!) {
    updateUser(id: $id, username: $username, email: $email, fullName: $fullName) {
      id
      username
      email
      fullName
    }
  }
`;

// Mutation untuk delete user
export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;
