import { gql } from "@apollo/client";
import { PERMISSION_FRAGMENT } from "@/graphql/fragments/permission.fragment";

export const GET_PERMISSIONS = gql`
  query GetPermissions {
    permissions {
      ...PermissionFragment
    }
  }
  ${PERMISSION_FRAGMENT}
`;

export const CREATE_PERMISSION = gql`
  mutation CreatePermission($name: String!, $code: String!) {
    createPermission(name: $name, code: $code) {
      ...PermissionFragment
    }
  }
  ${PERMISSION_FRAGMENT}
`;

export const UPDATE_PERMISSION = gql`
  mutation UpdatePermission($id: Int!, $name: String, $code: String) {
    updatePermission(id: $id, name: $name, code: $code) {
      ...PermissionFragment
    }
  }
  ${PERMISSION_FRAGMENT}
`;

export const DELETE_PERMISSION = gql`
  mutation DeletePermission($id: Int!) {
    deletePermission(id: $id)
  }
`;
