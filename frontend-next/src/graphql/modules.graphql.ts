import { gql } from "@apollo/client";
import { MODULE_FRAGMENT } from "@/graphql/fragments/module.fragment";

export const GET_MODULES = gql`
  query GetModules {
    modules {
      ...ModuleFragment
    }
  }
  ${MODULE_FRAGMENT}
`;

export const CREATE_MODULE = gql`
  mutation CreateModule($name: String!, $code: String!, $icon: String!, $url: String!, $roleIds: [Int!]) {
    createModule(name: $name, code: $code, icon: $icon, url: $url, roleIds: $roleIds) {
      ...ModuleFragment
    }
  }
  ${MODULE_FRAGMENT}
`;

export const UPDATE_MODULE = gql`
  mutation UpdateModule($id: Int!, $name: String!, $code: String!, $icon: String!, $url: String!, $roleIds: [Int!]) {
    updateModule(id: $id, name: $name, code: $code, icon: $icon, url: $url, roleIds: $roleIds) {
      ...ModuleFragment
    }
  }
  ${MODULE_FRAGMENT}
`;

export const DELETE_MODULE = gql`
  mutation DeleteModule($id: Int!) {
    deleteModule(id: $id)
  }
`;

export const USER_MODULES = gql`
  query UserModules {
    userModules {
      ...ModuleFragment
    }
  }
  ${MODULE_FRAGMENT}
`;