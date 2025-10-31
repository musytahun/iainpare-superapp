import strawberry
from typing import List, Optional
from strawberry import auto

from apps.references.models import *


@strawberry.django.type(BidangKepakaran)
class BidangKepakaranType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(Fakultas)
class FakultasType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(ProgramStudi)
class ProgramStudiType:
    id: auto
    code: auto
    name: auto
    fakultas: FakultasType


@strawberry.django.type(JabatanFungsional)
class JabatanFungsionalType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(JenisPublikasi)
class JenisPublikasiType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(PangkatGolongan)
class PangkatGolonganType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(Penerbit)
class PenerbitType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(Provinsi)
class ProvinsiType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(KabupatenKota)
class KabupatenKotaType:
    id: auto
    code: auto
    name: auto
    provinsi: ProvinsiType


@strawberry.django.type(SumberDana)
class SumberDanaType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(Tahun)
class TahunType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(JenisKolaborasi)
class JenisKolaborasiType:
    id: auto
    code: auto
    name: auto


@strawberry.django.type(KelompokRiset)
class KelompokRisetType:
    id: auto
    code: auto
    name: auto