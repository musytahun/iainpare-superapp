import { gql } from "@apollo/client";

export const PENGABDIAN_FRAGMENT = gql`
  fragment PengabdianFragment on PengabdianType { 
    id
    judul
    keterangan
    jumlahDana
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
    sumberDana {
        id
        code
        name
    }
    kelompokKeilmuan {
        id
        code
        name
    }
    jenisKolaborasi {
        id
        code
        name
    }
    tahun {
        id
        code
        name
    }
    lokasi {
        id
        code
        name
        provinsi {
            id
            code
            name
        }
    }
  }
`;