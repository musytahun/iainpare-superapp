import { gql } from "@apollo/client";
import { DOSEN_FRAGMENT } from "@/graphql/people/dosen.fragment";


export const GET_DOSEN = gql`
  query GetDosen {
    getDosen {
      ...DosenFragment
    }
  }
  ${DOSEN_FRAGMENT}
`;



export const CREATE_DOSEN = gql`
  mutation CreateDosen(
    $name: String,
    $email: String,
    $nomorHp: String,
    $alamat: String,
    $fotoProfil: String,
    $nidn: String,
    $nip: String,
    $gelarDepan: String,
    $gelarBelakang: String,
    $jabatanFungsionalId: Int,
    $pangkatGolonganId: Int,
    $programStudiId: Int,
    $bidangKepakaranId: Int 
  ) {
    createDosen(
      name: $name,
      email: $email,
      nomorHp: $nomorHp,
      alamat: $alamat,
      fotoProfil: $fotoProfil,
      nidn: $nidn,
      nip: $nip,
      gelarDepan: $gelarDepan,
      gelarBelakang: $gelarBelakang,
      jabatanFungsionalId: $jabatanFungsionalId,
      pangkatGolonganId: $pangkatGolonganId,
      programStudiId: $programStudiId,
      bidangKepakaranId: $bidangKepakaranId 
    ) {
      ...DosenFragment
    }
  }
  ${DOSEN_FRAGMENT}
`;



export const UPDATE_DOSEN = gql`
  mutation UpdateDosen(
    $id: Int!, 
    $name: String,
    $email: String,
    $nomorHp: String,
    $alamat: String,
    $fotoProfil: String,
    $nidn: String,
    $nip: String,
    $gelarDepan: String,
    $gelarBelakang: String,
    $jabatanFungsionalId: Int,
    $pangkatGolonganId: Int,
    $programStudiId: Int,
    $bidangKepakaranId: Int 
  ) {
    updateDosen(
      id: $id, 
      name: $name,
      email: $email,
      nomorHp: $nomorHp,
      alamat: $alamat,
      fotoProfil: $fotoProfil,
      nidn: $nidn,
      nip: $nip,
      gelarDepan: $gelarDepan,
      gelarBelakang: $gelarBelakang,
      jabatanFungsionalId: $jabatanFungsionalId,
      pangkatGolonganId: $pangkatGolonganId,
      programStudiId: $programStudiId,
      bidangKepakaranId: $bidangKepakaranId 
    ) {
      ...DosenFragment
    }
  }
  ${DOSEN_FRAGMENT}
`;



export const DELETE_DOSEN = gql`
  mutation DeleteDosen($id: Int!) {
    deleteDosen(id: $id)
  }
`;
