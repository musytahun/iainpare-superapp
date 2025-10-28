import { gql } from "@apollo/client";

export const GET_FAKULTAS = gql`
  query GetFakultas {
    getFakultas {
      id
      name
      code
    }
  }
`;

export const CREATE_FAKULTAS = gql`
  mutation CreateFakultas($code: String!, $name: String!) {
    createFakultas(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_FAKULTAS = gql`
  mutation UpdateFakultas($id: Int!, $code: String!, $name: String!) {
    updateFakultas(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_FAKULTAS = gql`
  mutation DeleteFakultas($id: Int!) {
    deleteFakultas(id: $id)
  }
`;