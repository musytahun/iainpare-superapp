import strawberry
from .bidang_kepakaran_schema import BidangKepakaranQuery, BidangKepakaranMutation
from .fakultas_schema import FakultasQuery, FakultasMutation
from .jabatan_fungsional_schema import JabatanFungsionalQuery, JabatanFungsionalMutation
from .indeksasi_schema import IndeksasiQuery, IndeksasiMutation
from .kabupaten_kota_schema import KabupatenKotaQuery, KabupatenKotaMutation
from .karya_ilmiah_schema import KaryaIlmiahQuery, KaryaIlmiahMutation
from .pangkat_golongan_schema import PangkatGolonganQuery, PangkatGolonganMutation
from .penerbit_schema import PenerbitQuery, PenerbitMutation
from .program_studi_schema import ProgramStudiQuery, ProgramStudiMutation
from .provinsi_schema import ProvinsiQuery, ProvinsiMutation
from .sumber_dana_schema import SumberDanaQuery, SumberDanaMutation
from .tahun_schema import TahunQuery, TahunMutation
from .jenis_kolaborasi_schema import JenisKolaborasiQuery, JenisKolaborasiMutation
from .kelompok_keilmuan_schema import KelompokKeilmuanQuery, KelompokKeilmuanMutation


@strawberry.type
class Query(
    BidangKepakaranQuery, 
    FakultasQuery, 
    JabatanFungsionalQuery, 
    IndeksasiQuery, 
    KabupatenKotaQuery, 
    KaryaIlmiahQuery,
    PangkatGolonganQuery, 
    PenerbitQuery, 
    ProgramStudiQuery, 
    ProvinsiQuery, 
    SumberDanaQuery, 
    TahunQuery,
    JenisKolaborasiQuery,
    KelompokKeilmuanQuery
    ):
    """Gabungan semua query di domain accounts"""
    pass


@strawberry.type
class Mutation(
    BidangKepakaranMutation, 
    FakultasMutation, 
    JabatanFungsionalMutation, 
    IndeksasiMutation, 
    KabupatenKotaMutation,
    KaryaIlmiahMutation,
    PangkatGolonganMutation, 
    PenerbitMutation, 
    ProgramStudiMutation, 
    ProvinsiMutation, 
    SumberDanaMutation, 
    TahunMutation,
    JenisKolaborasiMutation,
    KelompokKeilmuanMutation
    ):

    """Gabungan semua mutation di domain accounts"""
    pass
