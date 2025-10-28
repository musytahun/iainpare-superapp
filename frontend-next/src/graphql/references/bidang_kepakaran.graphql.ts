import { gql } from "@apollo/client";

export const GET_BIDANG_KEPAKARAN = gql`
  query GetBidangKepakaran {
    getBidangKepakaran {
      id
      name
      code
    }
  }
`;

export const CREATE_BIDANG_KEPAKARAN = gql`
  mutation CreateBidangKepakaran($code: String!, $name: String!) {
    createBidangKepakaran(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const UPDATE_BIDANG_KEPAKARAN = gql`
  mutation UpdateBidangKepakaran($id: Int!, $code: String!, $name: String!) {
    updateBidangKepakaran(id: $id, code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const DELETE_BIDANG_KEPAKARAN = gql`
  mutation DeleteBidangKepakaran($id: Int!) {
    deleteBidangKepakaran(id: $id)
  }
`;