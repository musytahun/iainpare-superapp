import { gql } from "@apollo/client";

export const GET_INDEKSASI = gql`
  query GetIndeksasi {
    getIndeksasi {
      id
      name
      code
    }
  }
`;

export const CREATE_INDEKSASI = gql`
  mutation CreateIndeksasi($code: String!, $name: String!) {
    createIndeksasi(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_INDEKSASI = gql`
  mutation UpdateIndeksasi($id: Int!, $code: String!, $name: String!) {
    updateIndeksasi(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_INDEKSASI = gql`
  mutation DeleteIndeksasi($id: Int!) {
    deleteIndeksasi(id: $id)
  }
`;