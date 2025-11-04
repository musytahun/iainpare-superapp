import { gql } from "@apollo/client";
import { STRATEGIC_ACTION_FRAGMENT } from "@/graphql/lppm/strategic_action.fragment";

export const GET_STRATEGIC_ACTION = gql`
  query GetStrategisAction {
    getStrategisAction {
        ...StrategicAcionFragment
    }
  }
${STRATEGIC_ACTION_FRAGMENT}
`;

export const CREATE_STRATEGIC_ACTION = gql`
  mutation CreateStrategisAction(
    $code: String!, 
    $name: String!,
    $strategicObjectiveId: Int,
    $current: Int,
    $target: Int,
    $unit: String,
    $allYear: [AllYearInput],
    $yearlyData: [YearlyDataInput],
    $strategicSourceId: Int,
    $filterKeyword: String,
    $isActive: Boolean
) {
    createStrategisAction(
        code: $code, 
        name: $name,
        strategicObjectiveId: $strategicObjectiveId,
        current: $current,
        target: $target,
        unit: $unit,
        allYear: $allYear,
        yearlyData: $yearlyData,
        strategicSourceId: $strategicSourceId,
        filterKeyword: $filterKeyword,
        isActive: $isActive
    ) {
        ...StrategicAcionFragment
    }
  }
  ${STRATEGIC_ACTION_FRAGMENT}
`;

export const UPDATE_STRATEGIC_ACTION = gql`
  mutation UpdateStrategisAction(
    $id: Int!, 
    $code: String!, 
    $name: String!,
    $strategicObjectiveId: Int,
    $current: Int,
    $target: Int,
    $unit: String,
    $allYear: [AllYearInput],
    $yearlyData: [YearlyDataInput],
    $strategicSourceId: Int,
    $filterKeyword: String,
    $isActive: Boolean
) {
    updateStrategisAction(
        id: $id, 
        code: $code, 
        name: $name,
        strategicObjectiveId: $strategicObjectiveId,
        current: $current,
        target: $target,
        unit: $unit,
        allYear: $allYear,
        yearlyData: $yearlyData,
        strategicSourceId: $strategicSourceId,
        filterKeyword: $filterKeyword,
        isActive: $isActive
    ) {
        ...StrategicAcionFragment
    }
  }
  ${STRATEGIC_ACTION_FRAGMENT}
`;

export const DELETE_STRATEGIC_ACTION = gql`
  mutation DeleteStrategisAction($id: Int!) {
    deleteStrategisAction(id: $id)
  }
`;


export const UPDATE_ALL_STRATEGIC_ACTIONS = gql`
  mutation UpdateAllStrategicActions {
    updateAllStrategicActions
  }
`;