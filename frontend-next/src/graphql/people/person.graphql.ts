import { gql } from "@apollo/client";


export const GET_PERSON = gql`
  query GetPerson {
    getPerson {
      id
      name
      email
      nomorHp
      alamat
      fotoProfil
    }
  }
`;