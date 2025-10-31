import { gql } from "@apollo/client";

export const GET_KELOMPOK_RISET = gql`
  query GetKelompokRiset {
    getKelompokRiset {
      id
      name
      code
    }
  }
`;

export const CREATE_KELOMPOK_RISET = gql`
  mutation CreateKelompokRiset($code: String!, $name: String!) {
    createKelompokRiset(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_KELOMPOK_RISET = gql`
  mutation UpdateKelompokRiset($id: Int!, $code: String!, $name: String!) {
    updateKelompokRiset(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_KELOMPOK_RISET = gql`
  mutation DeleteKelompokRiset($id: Int!) {
    deleteKelompokRiset(id: $id)
  }
`;