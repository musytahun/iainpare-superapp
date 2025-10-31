import strawberry
from strawberry import auto, LazyType
from typing import List, Optional

from apps.lppm.models import Penelitian, Pengabdian, Publikasi
from apps.references.types import SumberDanaType, KelompokRisetType, JenisKolaborasiType, TahunType


@strawberry.django.type(Penelitian)
class PenelitianType:
    id: auto
    judul: auto
    ketua_peneliti: Optional["LazyType['PersonType', 'apps.people.types']"]
    anggota_peneliti: Optional[List["LazyType['PersonType', 'apps.people.types']"]]
    keterangan: auto
    jumlah_dana: auto
    sumber_dana: Optional[SumberDanaType]
    kelompok_riset: Optional[KelompokRisetType]
    jenis_kolaborasi: Optional[JenisKolaborasiType]
    tahun: Optional[TahunType]

@strawberry.django.type(Pengabdian)
class PengabdianType:
    id: auto
    judul: auto
    # lokasi: Optional[str]
    # jumlah_dana: Optional[int]

@strawberry.django.type(Publikasi)
class PublikasiType:
    id: auto
    judul: auto
    # penerbit: Optional[str]
    # jenis: Optional[str]

@strawberry.type
class LppmProfileType:
    penelitian: List[PenelitianType]
    pengabdian: List[PengabdianType]
    publikasi: List[PublikasiType]