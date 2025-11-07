import strawberry
from strawberry import auto, LazyType
from typing import List, Optional

from apps.lppm.models import *
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

@strawberry.django.type(Dokumen)
class DokumenType:
    id: auto
    name: auto
    keterangan: auto
    kriteria_terkait: auto
    status: auto
    tahun: Optional[TahunType]
    link: auto

@strawberry.django.type(Kegiatan)
class KegiatanType:
    id: auto
    name: auto
    keterangan: auto
    tanggal: auto
    tempat: auto
    status: auto
    tahun: Optional[TahunType]
    link: auto
    penanggung_jawab: Optional[PositionType]

@strawberry.type
class LppmProfileType:
    penelitian: List[PenelitianType]
    pengabdian: List[PengabdianType]
    publikasi: List[PublikasiType]


# ----------------------------------------------------------------------------

@strawberry.django.type(StrategicSource)
class StrategicSourceType:
    id: auto
    code: auto
    name: auto

# @strawberry.django.type(StrategicGoal)
# class StrategicGoalType:
#     id: auto
#     code: auto
#     name: auto
#     is_active: auto
#     year_start: auto
#     year_end: auto

# @strawberry.django.type(StrategicObjective)
# class StrategicObjectiveType:
#     id: auto
#     code: auto
#     name: auto
#     strategic_goal: Optional[StrategicGoalType]
#     is_active: auto

# @strawberry.django.type(StrategicAction)
# class StrategicActionType:
#     id: auto
#     code: auto
#     name: auto
#     strategic_objective: Optional[StrategicObjectiveType]
#     current: auto
#     target: auto
#     all_year: auto
#     yearly_data: auto
#     strategic_source: Optional[StrategicSourceType]
#     filter_keyword: auto
#     is_active: auto


@strawberry.django.type(StrategicAction)
class StrategicActionType:
    id: strawberry.auto
    code: strawberry.auto
    name: strawberry.auto
    current: strawberry.auto
    target: strawberry.auto
    unit: strawberry.auto
    all_year: strawberry.auto
    yearly_data: strawberry.auto
    filter_keyword: strawberry.auto


@strawberry.django.type(StrategicObjective)
class StrategicObjectiveType:
    id: strawberry.auto
    code: strawberry.auto
    name: strawberry.auto
    actions: List[StrategicActionType]


@strawberry.django.type(StrategicGoal)
class StrategicGoalType:
    id: strawberry.auto
    code: strawberry.auto
    name: strawberry.auto
    is_active: strawberry.auto
    year_start: strawberry.auto
    year_end: strawberry.auto
    objectives: List[StrategicObjectiveType]


# @strawberry.type
# class Query:
#     getStrategisGoal: List[StrategicGoalType] = strawberry.django.field()