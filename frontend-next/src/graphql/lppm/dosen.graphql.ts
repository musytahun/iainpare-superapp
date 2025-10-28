import { gql } from "@apollo/client";

export const GET_DOSEN = gql`
  query GetDosen {
    getDosen {
      id
      name
      nidn
      fotoProfil
      gelarDepan
      gelarBelakang
    }
  }
`;
