import { gql } from "@apollo/client";
import { PENELITIAN_FRAGMENT } from "@/graphql/lppm/penelitian.fragment";


export const GET_PENELITIAN = gql`
  query GetPenelitian {
    getPenelitian {
      ...PenelitianFragment
    }
  }
  ${PENELITIAN_FRAGMENT}
`;



export const CREATE_PENELITIAN = gql`
  mutation CreatePenelitian(
    $judul: String!,
    $keterangan: String,
    $jumlahDana: Decimal,
    $ketuaId: Int,
    $anggotaIds: [Int!],
    $sumberDanaId: Int,
    $kelompokKeilmuanId: Int,
    $jenisKolaborasiId: Int,
    $tahunId: Int 
  ) {
    createPenelitian(
      judul: $judul,
      keterangan: $keterangan,
      jumlahDana: $jumlahDana,
      ketuaId: $ketuaId,
      anggotaIds: $anggotaIds,
      sumberDanaId: $sumberDanaId,
      kelompokKeilmuanId: $kelompokKeilmuanId,
      jenisKolaborasiId: $jenisKolaborasiId,
      tahunId: $tahunId 
    ) {
      ...PenelitianFragment
    }
  }
  ${PENELITIAN_FRAGMENT}
`;



export const UPDATE_PENELITIAN = gql`
  mutation UpdatePenelitian(
    $id: Int!, 
    $judul: String!,
    $keterangan: String,
    $jumlahDana: Decimal,
    $ketuaId: Int,
    $anggotaIds: [Int!],
    $sumberDanaId: Int,
    $kelompokKeilmuanId: Int,
    $jenisKolaborasiId: Int,
    $tahunId: Int 
  ) {
    updatePenelitian(
      id: $id, 
      judul: $judul,
      keterangan: $keterangan,
      jumlahDana: $jumlahDana,
      ketuaId: $ketuaId,
      anggotaIds: $anggotaIds,
      sumberDanaId: $sumberDanaId,
      kelompokKeilmuanId: $kelompokKeilmuanId,
      jenisKolaborasiId: $jenisKolaborasiId,
      tahunId: $tahunId 
    ) {
      ...PenelitianFragment
    }
  }
  ${PENELITIAN_FRAGMENT}
`;



export const DELETE_PENELITIAN = gql`
  mutation DeletePenelitian($id: Int!) {
    deletePenelitian(id: $id)
  }
`;
