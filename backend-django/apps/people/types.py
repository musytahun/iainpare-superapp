import strawberry
from typing import List, Optional
from strawberry.types import Info

from apps.people.models import Person, Dosen
from apps.lppm.types import PenelitianType, PengabdianType, PublikasiType

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

@strawberry.django.type(Dosen)
class DosenType:
    id: strawberry.ID
    nidn: Optional[str]
    gelar_depan: Optional[str]
    gelar_belakang: Optional[str]
    # jabatan_fungsional: Optional[JabatanFungsionalType]
    # program_studi: Optional[ProgramStudiType]

    @strawberry.field
    def name(self, info: Info) -> str:
        return self.person.name  # ambil dari OneToOneField

    @strawberry.field
    def email(self, info: Info) -> str:
        return self.person.email  # ambil dari OneToOneField

    @strawberry.field
    def nomor_hp(self, info: Info) -> str:
        return self.person.nomor_hp  # ambil dari OneToOneField

    @strawberry.field
    def alamat(self, info: Info) -> str:
        return self.person.alamat  # ambil dari OneToOneField

    @strawberry.field
    def foto_profil(self, info: Info) -> str:
        return self.person.foto_profil  # ambil dari OneToOneField

@strawberry.type
class DosenDetailType(DosenType):
    penelitian: List[PenelitianType]
    pengabdian: List[PengabdianType]
    publikasi: List[PublikasiType]