import { gql } from "@apollo/client";

export const PENELITIAN_FRAGMENT = gql`
  fragment PenelitianFragment on PenelitianType { 
    id
    judul
    jumlahDana
    keterangan
    ketua {
        id
        name
        email
        alamat
        nomorHp
        fotoProfil
    }
    anggota {
        id
        name
        email
        alamat
        nomorHp
        fotoProfil
    }
    jenisKolaborasi {
        id
        code
        name
    }
    kelompokKeilmuan {
        id
        code
        name
    }
    sumberDana {
        id
        code
        name
    }
    tahun {
        id
        code
        name
    }
  }
`;