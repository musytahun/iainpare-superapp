import { gql } from "@apollo/client";

export const PUBLIKASI_FRAGMENT = gql`
  fragment PublikasiFragment on PublikasiType { 
    id
    judul
    keterangan
    noRegis
    link
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
    kelompokKeilmuan {
        id
        code
        name
    }
    indeksasi {
        id
        code
        name
    }
    penerbit {
        id
        name
        code
    }
    tahun {
        id
        code
        name
    }
    karyaIlmiah {
        id
        name
        code
    }
  }
`;