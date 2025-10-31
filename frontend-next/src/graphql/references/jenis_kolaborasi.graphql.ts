import { gql } from "@apollo/client";

export const GET_JENIS_KOLABORASI = gql`
  query GetJenisKolaborasi {
    getJenisKolaborasi {
      id
      name
      code
    }
  }
`;

export const CREATE_JENIS_KOLABORASI = gql`
  mutation CreateJenisKolaborasi($code: String!, $name: String!) {
    createJenisKolaborasi(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_JENIS_KOLABORASI = gql`
  mutation UpdateJenisKolaborasi($id: Int!, $code: String!, $name: String!) {
    updateJenisKolaborasi(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_JENIS_KOLABORASI = gql`
  mutation DeleteJenisKolaborasi($id: Int!) {
    deleteJenisKolaborasi(id: $id)
  }
`;