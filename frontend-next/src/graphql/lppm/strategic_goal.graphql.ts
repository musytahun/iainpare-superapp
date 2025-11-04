import { gql } from "@apollo/client";

export const GET_STRATEGIC_GOAL = gql`
  query GetStrategicGoal {
    getStrategicGoal {
      code
      name
      isActive
      yearStart
      yearEnd
      objectives {
        code
        name
        actions {
          code
          name
          current
          target
          unit
          allYear
          yearlyData
        }
      }
    }
  }
`;

export const CREATE_STRATEGIC_GOAL = gql`
  mutation CreateStrategicGoal(
    $code: String!, 
    $name: String!,
    $isActive: Boolean,
    $yearStart: Int,
    $yearEnd: Int,
    $strategicObjectiveId: Int,
  ) {
    createStrategicGoal(
      code: $code, 
      name: $name,
      isActive: $isActive,
      yearStart: $yearStart,
      yearEnd: $yearEnd,
      strategicObjectiveId: $strategicObjectiveId
    ) {
      code
      name
      yearStart
      yearEnd
      objectives {
        code
        name
        actions {
          code
          name
          current
          target
          unit
          allYear
          yearlyData
        }
      }
    }
  }
`;

export const UPDATE_STRATEGIC_GOAL = gql`
  mutation UpdateStrategicGoal(
    $id: Int!, 
    $code: String!, 
    $name: String!,
    $isActive: Boolean,
    $yearStart: Int,
    $yearEnd: Int,
    $strategicObjectiveId: Int,
  ) {
    updateStrategicGoal(
      id: $id, 
      code: $code,
      name: $name,
      isActive: $isActive,
      yearStart: $yearStart,
      yearEnd: $yearEnd,
      strategicObjectiveId: $strategicObjectiveId
      ) {
      code
      name
      yearStart
      yearEnd
      objectives {
        code
        name
        actions {
          code
          name
          current
          target
          unit
          allYear
          yearlyData
        }
      }
    }
  }
`;

export const DELETE_STRATEGIC_GOAL = gql`
  mutation DeleteStrategicGoal($id: Int!) {
    deleteStrategicGoal(id: $id)
  }
`;