import { gql } from "@apollo/client";

export const GET_JABATAN_FUNGSIONAL = gql`
  query GetJabatanFungsional {
    getJabatanFungsional {
      id
      name
      code
    }
  }
`;

export const CREATE_JABATAN_FUNGSIONAL = gql`
  mutation CreateJabatanFungsional($code: String!, $name: String!) {
    createJabatanFungsional(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_JABATAN_FUNGSIONAL = gql`
  mutation UpdateJabatanFungsional($id: Int!, $code: String!, $name: String!) {
    updateJabatanFungsional(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_JABATAN_FUNGSIONAL = gql`
  mutation DeleteJabatanFungsional($id: Int!) {
    deleteJabatanFungsional(id: $id)
  }
`;