import { gql } from "@apollo/client";

export const GET_POSITION = gql`
  query GetPosition {
    getPosition {
      id
      name
      level
      description
      parent {
        id
        name
        level
      }
      subordinates {
        id
        name
      }
    }
  }
`;

export const CREATE_POSITION = gql`
  mutation CreatePosition($code: String!, $name: String!, $level: String!, $description: String!, $fakultasId: Int) {
    createPosition(code: $code, name: $name, level: $level, description: $description, fakultasId: $fakultasId) {
      id
      name
      level
      description
      parent {
        id
        name
        level
      }
      subordinates {
        id
        name
      }
    }
  }
`;

export const UPDATE_POSITION = gql`
  mutation UpdatePosition($id: Int!, $name: String!, $level: String!, $description: String!, $fakultasId: Int) {
    updatePosition(id: $id, code: $code, name: $name, fakultasId: $fakultasId) {
      id
      name
      level
      description
      parent {
        id
        name
        level
      }
      subordinates {
        id
        name
      }
    }
  }
`;

export const DELETE_POSITION = gql`
  mutation DeletePosition($id: Int!) {
    deletePosition(id: $id)
  }
`;