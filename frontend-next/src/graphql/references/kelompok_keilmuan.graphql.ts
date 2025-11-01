import { gql } from "@apollo/client";

export const GET_KELOMPOK_KEILMUAN = gql`
  query GetKelompokKeilmuan {
    getKelompokKeilmuan {
      id
      name
      code
    }
  }
`;

export const CREATE_KELOMPOK_KEILMUAN = gql`
  mutation CreateKelompokKeilmuan($code: String!, $name: String!) {
    createKelompokKeilmuan(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_KELOMPOK_KEILMUAN = gql`
  mutation UpdateKelompokKeilmuan($id: Int!, $code: String!, $name: String!) {
    updateKelompokKeilmuan(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_KELOMPOK_KEILMUAN = gql`
  mutation DeleteKelompokKeilmuan($id: Int!) {
    deleteKelompokKeilmuan(id: $id)
  }
`;