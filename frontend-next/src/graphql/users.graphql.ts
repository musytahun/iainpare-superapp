import { gql } from "@apollo/client";
import { USER_FIELDS } from "@/graphql/fragments/user.fragment";

// ----- QUERIES -----
// get all user
export const USERS = gql`
  ${USER_FIELDS}
  query GetUsers {
    users {
      ...UserFields
    }
  }
`;

// Query ambil user by username
export const GET_USER_BY_ID = gql`
  ${USER_FIELDS}
  query GetUserById($id: Int!) {
    userById(id: $id) {
      ...UserFields
    }
  }
`;

// Query ambil user by username
export const GET_USER_BY_USERNAME = gql`
  ${USER_FIELDS}
  query GetUserByUsername($username: String!) {
    userByUsername(username: $username) {
      ...UserFields
    }
  }
`;


// ----- MUTATIONS -----
// Mutation untuk create user
export const CREATE_USER = gql`
  ${USER_FIELDS}
  mutation CreateUser($username: String!, $password: String!, $email: String!, $fullName: String) {
    createUser(username: $username, password: $password, email: $email, fullName: $fullName) {
      ...UserFields
    }
  }
`;

// Mutation untuk update user
export const UPDATE_USER = gql`
  ${USER_FIELDS}
  mutation UpdateUser($id: Int!, $username: String!, $email: String!, $fullName: String!) {
    updateUser(id: $id, username: $username, email: $email, fullName: $fullName) {
      ...UserFields
    }
  }
`;

// Mutation untuk delete user
export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;