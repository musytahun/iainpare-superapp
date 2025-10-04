import { gql } from "@apollo/client";

// Fragment reusable untuk field user
export const USER_FIELDS = gql`
# on UserType menyesuaikan dengan tipe data yang dikembalikan oleh Strawberry (cek schema GraphQL, biasanya UserType)
  fragment UserFields on UserType { 
    id
    username
    email
    fullName
  }
`;