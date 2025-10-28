import { gql } from "@apollo/client";

export const GET_PROGRAM_STUDI = gql`
  query GetProgramStudi {
    getProgramStudi {
      id
      name
      code
      fakultas {
        id
        code
        name
      }
    }
  }
`;

export const CREATE_PROGRAM_STUDI = gql`
  mutation CreateProgramStudi($code: String!, $name: String!, $fakultasId: Int) {
    createProgramStudi(code: $code, name: $name, fakultasId: $fakultasId) {
      id
      name
      code
      fakultas {
        id
        code
        name
      }
    }
  }
`;

export const UPDATE_PROGRAM_STUDI = gql`
  mutation UpdateProgramStudi($id: Int!, $code: String!, $name: String!, $fakultasId: Int) {
    updateProgramStudi(id: $id, code: $code, name: $name, fakultasId: $fakultasId) {
      id
      name
      code
      fakultas {
        id
        code
        name
      }
    }
  }
`;

export const DELETE_PROGRAM_STUDI = gql`
  mutation DeleteProgramStudi($id: Int!) {
    deleteProgramStudi(id: $id)
  }
`;