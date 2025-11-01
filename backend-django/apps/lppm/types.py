import strawberry
from strawberry import auto, LazyType
from typing import List, Optional

from apps.lppm.models import Penelitian, Pengabdian, Publikasi
from apps.references.types import *


@strawberry.django.type(Penelitian)
class PenelitianType:
    id: auto
    judul: auto
    ketua: Optional["LazyType['PersonType', 'apps.people.types']"]
    anggota: Optional[List["LazyType['PersonType', 'apps.people.types']"]]
    keterangan: auto
    jumlah_dana: auto
    sumber_dana: Optional[SumberDanaType]
    kelompok_keilmuan: Optional[KelompokKeilmuanType]
    jenis_kolaborasi: Optional[JenisKolaborasiType]
    tahun: Optional[TahunType]

@strawberry.django.type(Pengabdian)
class PengabdianType:
    id: auto
    judul: auto
    ketua: Optional["LazyType['PersonType', 'apps.people.types']"]
    anggota: Optional[List["LazyType['PersonType', 'apps.people.types']"]]
    keterangan: auto
    jumlah_dana: auto
    sumber_dana: Optional[SumberDanaType]
    kelompok_keilmuan: Optional[KelompokKeilmuanType]
    jenis_kolaborasi: Optional[JenisKolaborasiType]
    tahun: Optional[TahunType]
    lokasi: Optional[KabupatenKotaType]

@strawberry.django.type(Publikasi)
class PublikasiType:
    id: auto
    judul: auto
    ketua: Optional["LazyType['PersonType', 'apps.people.types']"]
    anggota: Optional[List["LazyType['PersonType', 'apps.people.types']"]]
    keterangan: auto
    kelompok_keilmuan: Optional[KelompokKeilmuanType]
    indeksasi: Optional[IndeksasiType]
    penerbit: Optional[PenerbitType]
    no_regis: auto
    tahun: Optional[TahunType]
    link: auto
    karya_ilmiah: Optional[KaryaIlmiahType]

@strawberry.type
class LppmProfileType:
    penelitian: List[PenelitianType]
    pengabdian: List[PengabdianType]
    publikasi: List[PublikasiType]