import { gql } from "@apollo/client";

export const GET_PENERBIT = gql`
  query GetPenerbit {
    getPenerbit {
      id
      name
      code
    }
  }
`;

export const CREATE_PENERBIT = gql`
  mutation CreatePenerbit($code: String!, $name: String!) {
    createPenerbit(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_PENERBIT = gql`
  mutation UpdatePenerbit($id: Int!, $code: String!, $name: String!) {
    updatePenerbit(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_PENERBIT = gql`
  mutation DeletePenerbit($id: Int!) {
    deletePenerbit(id: $id)
  }
`;