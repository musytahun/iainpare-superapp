import { gql } from "@apollo/client";
import { ROLE_FRAGMENT } from "@/graphql/fragments/role.fragment";

export const GET_ROLES = gql`
  query GetRoles {
    roles {
      ...RoleFragment
    }
  }
  ${ROLE_FRAGMENT}
`;

export const CREATE_ROLE = gql`
  mutation CreateRole($name: String!, $permissionIds: [Int!]) {
    createRole(name: $name, permissionIds: $permissionIds) {
      ...RoleFragment
    }
  }
  ${ROLE_FRAGMENT}
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: Int!, $name: String, $permissionIds: [Int!]) {
    updateRole(id: $id, name: $name, permissionIds: $permissionIds) {
      ...RoleFragment
    }
  }
  ${ROLE_FRAGMENT}
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: Int!) {
    deleteRole(id: $id)
  }
`;
