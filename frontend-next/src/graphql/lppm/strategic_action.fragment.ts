import { gql } from "@apollo/client";

export const STRATEGIC_ACTION_FRAGMENT = gql`
  fragment StrategicActionFragment on StrategicActionType { 
    id
    name
    code
    strategicObjective {
        id
        code
        name
        strategicGoal {
            id
            code
            name
        }
        isActive
    }
    current
    target
    unit
    allYear
    yearlyData
    strategicSource {
        id
        code
        name
    }
    filterKeyword
    isActive
  }
`;