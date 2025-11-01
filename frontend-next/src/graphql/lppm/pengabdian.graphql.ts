import { gql } from "@apollo/client";
import { PENGABDIAN_FRAGMENT } from "@/graphql/lppm/pengabdian.fragment";


export const GET_PENGABDIAN = gql`
  query GetPengabdian {
    getPengabdian {
      ...PengabdianFragment
    }
  }
  ${PENGABDIAN_FRAGMENT}
`;



export const CREATE_PENGABDIAN = gql`
  mutation CreatePengabdian(
    $judul: String!,
    $ketuaId: Int,
    $anggotaIds: [Int!],
    $keterangan: String,
    $jumlahDana: Decimal,
    $sumberDanaId: Int,
    $kelompokKeilmuanId: Int,
    $jenisKolaborasiId: Int,
    $tahunId: Int,
    $lokasiId: Int
  ) {
    createPengabdian(
      judul: $judul,
      ketuaId: $ketuaId,
      anggotaIds: $anggotaIds,
      keterangan: $keterangan,
      jumlahDana: $jumlahDana,
      sumberDanaId: $sumberDanaId,
      kelompokKeilmuanId: $kelompokKeilmuanId,
      jenisKolaborasiId: $jenisKolaborasiId,
      tahunId: $tahunId,
      lokasiId: $lokasiId
    ) {
      ...PengabdianFragment
    }
  }
  ${PENGABDIAN_FRAGMENT}
`;



export const UPDATE_PENGABDIAN = gql`
  mutation UpdatePengabdian(
    $id: Int!, 
    $judul: String!,
    $ketuaId: Int,
    $anggotaIds: [Int!],
    $keterangan: String,
    $jumlahDana: Decimal,
    $sumberDanaId: Int,
    $kelompokKeilmuanId: Int,
    $jenisKolaborasiId: Int,
    $tahunId: Int,
    $lokasiId: Int
  ) {
    updatePengabdian(
      id: $id, 
      judul: $judul,
      ketuaId: $ketuaId,
      anggotaIds: $anggotaIds,
      keterangan: $keterangan,
      jumlahDana: $jumlahDana,
      sumberDanaId: $sumberDanaId,
      kelompokKeilmuanId: $kelompokKeilmuanId,
      jenisKolaborasiId: $jenisKolaborasiId,
      tahunId: $tahunId,
      lokasiId: $lokasiId
    ) {
      ...PengabdianFragment
    }
  }
  ${PENGABDIAN_FRAGMENT}
`;



export const DELETE_PENGABDIAN = gql`
  mutation DeletePengabdian($id: Int!) {
    deletePengabdian(id: $id)
  }
`;
