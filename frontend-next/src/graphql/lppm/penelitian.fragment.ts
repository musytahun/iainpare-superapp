import { gql } from "@apollo/client";

export const PENELITIAN_FRAGMENT = gql`
  fragment PenelitianFragment on PenelitianType { 
    id
    judul
    jumlahDana
    keterangan
    ketuaPeneliti {
        id
        name
        email
        alamat
        nomorHp
        fotoProfil
    }
    anggotaPeneliti {
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
    kelompokRiset {
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