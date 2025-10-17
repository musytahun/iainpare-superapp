import { gql } from "@apollo/client";

export const MODULE_FRAGMENT = gql`
  fragment ModuleFragment on ModuleType { 
    id
    name
    code
    icon
    url
    roles {
      id
      name
    }
  }
`;