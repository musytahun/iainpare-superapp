import { gql } from "@apollo/client";


export const GET_DOKUMEN = gql`
  query GetDokumen {
        getDokumen {
            id
            name
            keterangan
            kriteriaTerkait
            status
            tahun {
                id
                code
                name
            }
            link
        }
    }
`;



export const CREATE_DOKUMEN = gql`
  mutation CreateDokumen(
    $name: String!,
    $keterangan: String,
    $kriteriaTerkait: String,
    $status: String,
    $tahunId: Int,
    $link: String
  ) {
    createDokumen(
      name: $name,
      keterangan: $keterangan,
      kriteriaTerkait: $kriteriaTerkait,
      status: $status,
      tahunId: $tahunId,
      link: $link
    ) {
        id
        name
        keterangan
        kriteriaTerkait
        status
        tahun {
            id
            code
            name
        }
        link
    }
  }
`;



export const UPDATE_DOKUMEN = gql`
  mutation UpdateDokumen(
    $id: Int!, 
    $name: String!,
    $keterangan: String,
    $kriteriaTerkait: String,
    $status: String,
    $tahunId: Int,
    $link: String
  ) {
    updateDokumen(
      id: $id, 
      name: $name,
      keterangan: $keterangan,
      kriteriaTerkait: $kriteriaTerkait,
      status: $status,
      tahunId: $tahunId,
      link: $link
    ) {
        id
        name
        keterangan
        kriteriaTerkait
        status
        tahun {
            id
            code
            name
        }
        link
    }
  }
`;



export const DELETE_DOKUMEN = gql`
  mutation DeleteDokumen($id: Int!) {
    deleteDokumen(id: $id)
  }
`;
