import strawberry
from .bidang_kepakaran_schema import BidangKepakaranQuery, BidangKepakaranMutation
from .fakultas_schema import FakultasQuery, FakultasMutation
from .jabatan_fungsional_schema import JabatanFungsionalQuery, JabatanFungsionalMutation
from .jenis_publikasi_schema import JenisPublikasiQuery, JenisPublikasiMutation
from .kabupaten_kota_schema import KabupatenKotaQuery, KabupatenKotaMutation
from .pangkat_golongan_schema import PangkatGolonganQuery, PangkatGolonganMutation
from .penerbit_schema import PenerbitQuery, PenerbitMutation
from .program_studi_schema import ProgramStudiQuery, ProgramStudiMutation
from .provinsi_schema import ProvinsiQuery, ProvinsiMutation
from .sumber_dana_schema import SumberDanaQuery, SumberDanaMutation
from .tahun_schema import TahunQuery, TahunMutation


@strawberry.type
class Query(BidangKepakaranQuery, FakultasQuery, JabatanFungsionalQuery, JenisPublikasiQuery, KabupatenKotaQuery, PangkatGolonganQuery, PenerbitQuery, ProgramStudiQuery, ProvinsiQuery, SumberDanaQuery, TahunQuery):
    """Gabungan semua query di domain accounts"""
    pass


@strawberry.type
class Mutation(BidangKepakaranMutation, FakultasMutation, JabatanFungsionalMutation, JenisPublikasiMutation, KabupatenKotaMutation, PangkatGolonganMutation, PenerbitMutation, ProgramStudiMutation, ProvinsiMutation, SumberDanaMutation, TahunMutation):
    """Gabungan semua mutation di domain accounts"""
    pass
