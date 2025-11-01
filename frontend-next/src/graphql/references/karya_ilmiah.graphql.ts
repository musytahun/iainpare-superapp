import { gql } from "@apollo/client";

export const GET_KARYA_ILMIAH = gql`
  query GetKaryaIlmiah {
    getKaryaIlmiah {
      id
      name
      code
    }
  }
`;

export const CREATE_KARYA_ILMIAH = gql`
  mutation CreateKaryaIlmiah($code: String!, $name: String!) {
    createKaryaIlmiah(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_KARYA_ILMIAH = gql`
  mutation UpdateKaryaIlmiah($id: Int!, $code: String!, $name: String!) {
    updateKaryaIlmiah(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_KARYA_ILMIAH = gql`
  mutation DeleteKaryaIlmiah($id: Int!) {
    deleteKaryaIlmiah(id: $id)
  }
`;