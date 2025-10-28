import { gql } from "@apollo/client";

export const GET_PANGKAT_GOLONGAN = gql`
  query GetPangkatGolongan {
    getPangkatGolongan {
      id
      name
      code
    }
  }
`;

export const CREATE_PANGKAT_GOLONGAN = gql`
  mutation CreatePangkatGolongan($code: String!, $name: String!) {
    createPangkatGolongan(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_PANGKAT_GOLONGAN = gql`
  mutation UpdatePangkatGolongan($id: Int!, $code: String!, $name: String!) {
    updatePangkatGolongan(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_PANGKAT_GOLONGAN = gql`
  mutation DeletePangkatGolongan($id: Int!) {
    deletePangkatGolongan(id: $id)
  }
`;