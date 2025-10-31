import { gql } from "@apollo/client";

export const DOSEN_FRAGMENT = gql`
  fragment DosenFragment on DosenType { 
      id
      name
      email
      nomorHp
      alamat
      fotoProfil
      nidn
      nip
      gelarDepan
      gelarBelakang
      jabatanFungsional {
        id
        code
        name
      }
      pangkatGolongan {
        id
        code
        name
      }
      programStudi {
        id
        code
        name
        fakultas {
          id
          code
          name
        }
      }
      bidangKepakaran {
        id
        code
        name
      }
  }
`;