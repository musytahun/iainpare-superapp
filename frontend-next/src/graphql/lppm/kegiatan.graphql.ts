import { gql } from "@apollo/client";


export const GET_KEGIATAN = gql`
  query GetKegiatan {
        getKegiatan {
            id
            name
            keterangan
            tanggal
            tempat
            status
            tahun {
                id
                code
                name
            }
            link
            penanggungJawab {
                id
                name
                level
                description
            }
        }
    }
`;



export const CREATE_KEGIATAN = gql`
  mutation CreateKegiatan(
    $name: String!,
    $keterangan: String,
    $tanggal: Date,
    $tempat: String,
    $status: String,
    $tahunId: Int,
    $link: String,
    $penanggungJawabId: Int
  ) {
    createKegiatan(
      name: $name,
      keterangan: $keterangan,
      tanggal: $tanggal,
      tempat: $tempat,
      status: $status,
      tahunId: $tahunId,
      link: $link,
      penanggungJawabId: $penanggungJawabId,
    ) {
        id
        name
        keterangan
        tanggal
        tempat
        status
        tahun {
            id
            code
            name
        }
        link
        penanggungJawab {
            id
            name
            level
            description
        }
    }
  }
`;



export const UPDATE_KEGIATAN = gql`
  mutation UpdateKegiatan(
    $id: Int!, 
    $name: String!,
    $keterangan: String,
    $tanggal: Date,
    $tempat: String,
    $status: String,
    $tahunId: Int,
    $link: String,
    $penanggungJawabId: Int
  ) {
    updateKegiatan(
      id: $id, 
      name: $name,
      keterangan: $keterangan,
      tanggal: $tanggal,
      tempat: $tempat,
      status: $status,
      tahunId: $tahunId,
      link: $link,
      penanggungJawabId: $penanggungJawabId,
    ) {
        id
        name
        keterangan
        tanggal
        tempat
        status
        tahun {
            id
            code
            name
        }
        link
        penanggungJawab {
            id
            name
            level
            description
        }
    }
  }
`;



export const DELETE_KEGIATAN = gql`
  mutation DeleteKegiatan($id: Int!) {
    deleteKegiatan(id: $id)
  }
`;
