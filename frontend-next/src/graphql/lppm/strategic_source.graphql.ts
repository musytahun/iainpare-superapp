import { gql } from "@apollo/client";

export const GET_STRATEGIC_SOURCE = gql`
  query GetStrategisSource {
    getStrategisSource {
      id
      name
      code
    }
  }
`;

export const CREATE_STRATEGIC_SOURCE = gql`
  mutation CreateStrategisSource($code: String!, $name: String!) {
    createStrategisSource(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_STRATEGIC_SOURCE = gql`
  mutation UpdateStrategisSource($id: Int!, $code: String!, $name: String!) {
    updateStrategisSource(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_STRATEGIC_SOURCE = gql`
  mutation DeleteStrategisSource($id: Int!) {
    deleteStrategisSource(id: $id)
  }
`;