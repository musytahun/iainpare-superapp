import { gql } from "@apollo/client";

// get all user
export const USERS = gql`
  query {
    users {
      id
      username
      email
      fullName
    }
  }
`;

// Query ambil user by username
export const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    userById(id: $id) {
      id
      username
      email
      fullName
    }
  }
`;

// Query ambil user by username
export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      username
      email
      fullName
    }
  }
`;
