import strawberry
from strawberry import auto, LazyType
from typing import List, Optional
from strawberry.types import Info

from apps.people.models import Person, Dosen
from apps.lppm.types import PenelitianType, PengabdianType, PublikasiType
from apps.references.types import *

# @strawberry.type
# class JabatanFungsionalType:
#     id: strawberry.ID
#     name: str

# @strawberry.type
# class ProgramStudiType:
#     id: strawberry.ID
#     name: str

@strawberry.django.type(Person)
class PersonType:
    id: strawberry.ID
    name: str
    email: Optional[str]
    nomor_hp: Optional[str]
    alamat: Optional[str]
    foto_profil: Optional[str]
    # Relasi balik ke LPPM
    penelitian: List["LazyType['PenelitianType', 'apps.lppm.types']"]
    pengabdian: List["LazyType['PengabdianType', 'apps.lppm.types']"]
    publikasi: List["LazyType['PublikasiType', 'apps.lppm.types']"]


@strawberry.django.type(Dosen)
class DosenType:
    id: strawberry.ID
    nidn: Optional[str]
    nip: Optional[str]
    gelar_depan: Optional[str]
    gelar_belakang: Optional[str]
    jabatan_fungsional: Optional[JabatanFungsionalType]
    pangkat_golongan: Optional[PangkatGolonganType]
    program_studi: Optional[ProgramStudiType]
    bidang_kepakaran: Optional[BidangKepakaranType]

    @strawberry.field
    def name(self, info: Info) -> Optional[str]:
        return self.person.name  # ambil dari OneToOneField

    @strawberry.field
    def email(self, info: Info) -> Optional[str]:
        return self.person.email  # ambil dari OneToOneField

    @strawberry.field
    def nomor_hp(self, info: Info) -> Optional[str]:
        return self.person.nomor_hp  # ambil dari OneToOneField

    @strawberry.field
    def alamat(self, info: Info) -> Optional[str]:
        return self.person.alamat  # ambil dari OneToOneField

    @strawberry.field
    def foto_profil(self, info: Info) -> Optional[str]:
        return self.person.foto_profil  # ambil dari OneToOneField

@strawberry.type
class DosenDetailType(DosenType):
    penelitian: List[PenelitianType]
    pengabdian: List[PengabdianType]
    publikasi: List[PublikasiType]