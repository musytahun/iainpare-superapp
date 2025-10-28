import { gql } from "@apollo/client";

export const GET_KABUPATEN_KOTA = gql`
  query GetKabupatenKota {
    getKabupatenKota {
      id
      name
      code
      provinsi {
        id
        code
        name
      }
    }
  }
`;

export const CREATE_KABUPATEN_KOTA = gql`
  mutation CreateKabupatenKota($code: String!, $name: String!, $provinsiId: Int) {
    createKabupatenKota(code: $code, name: $name, provinsiId: $provinsiId) {
      id
      name
      code
      provinsi {
        id
        code
        name
      }
    }
  }
`;

export const UPDATE_KABUPATEN_KOTA = gql`
  mutation UpdateKabupatenKota($id: Int!, $code: String!, $name: String!, $provinsiId: Int) {
    updateKabupatenKota(id: $id, code: $code, name: $name, provinsiId: $provinsiId) {
      id
      name
      code
      provinsi {
        id
        code
        name
      }
    }
  }
`;

export const DELETE_KABUPATEN_KOTA = gql`
  mutation DeleteKabupatenKota($id: Int!) {
    deleteKabupatenKota(id: $id)
  }
`;