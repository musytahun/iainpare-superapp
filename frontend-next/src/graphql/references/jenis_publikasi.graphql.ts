import { gql } from "@apollo/client";

export const GET_JENIS_PUBLIKASI = gql`
  query GetJenisPublikasi {
    getJenisPublikasi {
      id
      name
      code
    }
  }
`;

export const CREATE_JENIS_PUBLIKASI = gql`
  mutation CreateJenisPublikasi($code: String!, $name: String!) {
    createJenisPublikasi(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_JENIS_PUBLIKASI = gql`
  mutation UpdateJenisPublikasi($id: Int!, $code: String!, $name: String!) {
    updateJenisPublikasi(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_JENIS_PUBLIKASI = gql`
  mutation DeleteJenisPublikasi($id: Int!) {
    deleteJenisPublikasi(id: $id)
  }
`;