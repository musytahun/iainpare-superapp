import { gql } from "@apollo/client";

export const GET_STRATEGIC_GOAL = gql`
  query GetStrategicGoal {
    getStrategicGoal {
      id
      name
      code
      isActive
      yearStart
      yearEnd
    }
  }
`;

export const CREATE_STRATEGIC_GOAL = gql`
  mutation CreateStrategicGoal($code: String!, $name: String!) {
    createStrategicGoal(code: $code, name: $name) {
      id
      name
      code
      isActive
      yearStart
      yearEnd
    }
  }
`;

export const UPDATE_STRATEGIC_GOAL = gql`
  mutation UpdateStrategicGoal($id: Int!, $code: String!, $name: String!) {
    updateStrategicGoal(id: $id, code: $code, name: $name) {
      id
      name
      code
      isActive
      yearStart
      yearEnd
    }
  }
`;

export const DELETE_STRATEGIC_GOAL = gql`
  mutation DeleteStrategicGoal($id: Int!) {
    deleteStrategicGoal(id: $id)
  }
`;