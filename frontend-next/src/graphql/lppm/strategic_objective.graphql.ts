import { gql } from "@apollo/client";

export const GET_STRATEGIC_OBJECTIVE = gql`
  query GetStrategisObjective {
    getStrategisObjective {
      id
      name
      code
      strategicGoal {
        id
        code
        name
      }
      isActive
    }
  }
`;

export const CREATE_STRATEGIC_OBJECTIVE = gql`
  mutation CreateStrategisObjective(
    $code: String!, 
    $name: String!,
    $strategicGoalId: Int,
    $isActive: Boolean
  ) {
    createStrategisObjective(
      code: $code, 
      name: $name,
      strategicGoalId: $strategicGoalId,
      isActive: $isActive
    ) {
      id
      name
      code
      strategicGoal {
        id
        code
        name
      }
      isActive
    }
  }
`;

export const UPDATE_STRATEGIC_OBJECTIVE = gql`
  mutation UpdateStrategisObjective(
    $id: Int!, 
    $code: String!, 
    $name: String!,
    $strategicGoalId: Int,
    $isActive: Boolean
  ) {
    updateStrategisObjective(
      id: $id, 
      code: $code, 
      name: $name,
      strategicGoalId: $strategicGoalId,
      isActive: $isActive
    ) {
      id
      name
      code
      strategicGoal {
        id
        code
        name
      }
      isActive
    }
  }
`;

export const DELETE_STRATEGIC_OBJECTIVE = gql`
  mutation DeleteStrategisObjective($id: Int!) {
    deleteStrategisObjective(id: $id)
  }
`;