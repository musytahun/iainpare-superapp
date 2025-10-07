import { gql } from "@apollo/client";

export const ROLE_FRAGMENT = gql`
  fragment RoleFragment on RoleType {
    id
    name
    permissions {
      id
      name
      code
    }
  }
`;
