import { gql } from "@apollo/client";

export const GET_PROVINSI = gql`
  query GetProvinsi {
    getProvinsi {
      id
      name
      code
    }
  }
`;

export const CREATE_PROVINSI = gql`
  mutation CreateProvinsi($code: String!, $name: String!) {
    createProvinsi(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_PROVINSI = gql`
  mutation UpdateProvinsi($id: Int!, $code: String!, $name: String!) {
    updateProvinsi(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_PROVINSI = gql`
  mutation DeleteProvinsi($id: Int!) {
    deleteProvinsi(id: $id)
  }
`;