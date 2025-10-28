import { gql } from "@apollo/client";

export const GET_SUMBER_DANA = gql`
  query GetSumberDana {
    getSumberDana {
      id
      name
      code
    }
  }
`;

export const CREATE_SUMBER_DANA = gql`
  mutation CreateSumberDana($code: String!, $name: String!) {
    createSumberDana(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_SUMBER_DANA = gql`
  mutation UpdateSumberDana($id: Int!, $code: String!, $name: String!) {
    updateSumberDana(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_SUMBER_DANA = gql`
  mutation DeleteSumberDana($id: Int!) {
    deleteSumberDana(id: $id)
  }
`;