import { gql } from "@apollo/client";

export const GET_TAHUN = gql`
  query GetTahun {
    getTahun {
      id
      name
      code
    }
  }
`;

export const CREATE_TAHUN = gql`
  mutation CreateTahun($code: String!, $name: String!) {
    createTahun(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_TAHUN = gql`
  mutation UpdateTahun($id: Int!, $code: String!, $name: String!) {
    updateTahun(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_TAHUN = gql`
  mutation DeleteTahun($id: Int!) {
    deleteTahun(id: $id)
  }
`;