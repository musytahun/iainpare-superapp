import { gql } from "@apollo/client";
import { PUBLIKASI_FRAGMENT } from "@/graphql/lppm/publikasi.fragment";


export const GET_PUBLIKASI = gql`
  query GetPublikasi {
    getPublikasi {
      ...PublikasiFragment
    }
  }
  ${PUBLIKASI_FRAGMENT}
`;



export const CREATE_PUBLIKASI = gql`
  mutation CreatePublikasi(
    $judul: String!,
    $ketuaId: Int,
    $anggotaIds: [Int!],
    $keterangan: String,
    $kelompokKeilmuanId: Int,
    $indeksasiId: Int,
    $penerbitId: Int,
    $noRegis: String,
    $tahunId: Int,
    $link: String,
    $karyaIlmiahId: Int
  ) {
    createPublikasi(
      judul: $judul,
      ketuaId: $ketuaId,
      anggotaIds: $anggotaIds,
      keterangan: $keterangan,
      kelompokKeilmuanId: $kelompokKeilmuanId,
      indeksasiId: $indeksasiId,
      penerbitId: $penerbitId,
      noRegis: $noRegis,
      tahunId: $tahunId,
      link: $link,
      karyaIlmiahId: $karyaIlmiahId
    ) {
      ...PublikasiFragment
    }
  }
  ${PUBLIKASI_FRAGMENT}
`;



export const UPDATE_PUBLIKASI = gql`
  mutation UpdatePublikasi(
    $id: Int!, 
    $judul: String!,
    $ketuaId: Int,
    $anggotaIds: [Int!],
    $keterangan: String,
    $kelompokKeilmuanId: Int,
    $indeksasiId: Int,
    $penerbitId: Int,
    $noRegis: String,
    $tahunId: Int,
    $link: String,
    $karyaIlmiahId: Int
  ) {
    updatePublikasi(
      id: $id, 
      judul: $judul,
      ketuaId: $ketuaId,
      anggotaIds: $anggotaIds,
      keterangan: $keterangan,
      kelompokKeilmuanId: $kelompokKeilmuanId,
      indeksasiId: $indeksasiId,
      penerbitId: $penerbitId,
      noRegis: $noRegis,
      tahunId: $tahunId,
      link: $link,
      karyaIlmiahId: $karyaIlmiahId
    ) {
      ...PublikasiFragment
    }
  }
  ${PUBLIKASI_FRAGMENT}
`;



export const DELETE_PUBLIKASI = gql`
  mutation DeletePublikasi($id: Int!) {
    deletePublikasi(id: $id)
  }
`;
