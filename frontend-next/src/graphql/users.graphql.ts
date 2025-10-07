import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "@/graphql/fragments/user.fragment";

// ----- QUERIES -----
// get all user
export const USERS = gql`
  ${USER_FRAGMENT}
  query GetUsers {
    users {
      ...UserFragment
    }
  }
`;

// Query ambil user by username
export const GET_USER_BY_ID = gql`
  ${USER_FRAGMENT}
  query GetUserById($id: Int!) {
    userById(id: $id) {
      ...UserFragment
    }
  }
`;

// Query ambil user by username
export const GET_USER_BY_USERNAME = gql`
  ${USER_FRAGMENT}
  query GetUserByUsername($username: String!) {
    userByUsername(username: $username) {
      ...UserFragment
    }
  }
`;


// ----- MUTATIONS -----
// Mutation untuk create user
export const CREATE_USER = gql`
  ${USER_FRAGMENT}
  mutation CreateUser($username: String!, $password: String!, $email: String!, $fullName: String, $roleId: Int!) {
    createUser(username: $username, password: $password, email: $email, fullName: $fullName, roleId: $roleId) {
      ...UserFragment
    }
  }
`;

// Mutation untuk update user
export const UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation UpdateUser($id: Int!, $username: String!, $email: String!, $fullName: String!) {
    updateUser(id: $id, username: $username, email: $email, fullName: $fullName) {
      ...UserFragment
    }
  }
`;

// Mutation untuk delete user
export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($id: Int!, $roleId: Int!) {
    updateUserRole(id: $id, roleId: $roleId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;