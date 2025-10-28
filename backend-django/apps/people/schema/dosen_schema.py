# apps/people/schema/dosen_schema.py
import strawberry
from typing import List
from strawberry.types import Info
from apps.people.types import DosenType, DosenDetailType

from apps.people.selectors import dosen_selector
from apps.people.services import dosen_service


@strawberry.type
class DosenQuery:
    @strawberry.field
    def get_dosen(self, info: Info) -> List[DosenType]:
        return dosen_selector.get_dosen()

    @strawberry.field
    def dosen_detail(self, info: Info, id: int) -> DosenDetailType:
        data = dosen_service.get_dosen_with_lppm_detail(id)
        return DosenDetailType(
            id=data["dosen"].id,
            # name=data["dosen"].name,
            nidn=data["dosen"].nidn,
            # jabatan_fungsional=data["dosen"].jabatan_fungsional,
            # program_studi=data["dosen"].program_studi,
            penelitian=data["penelitian"],
            pengabdian=data["pengabdian"],
            publikasi=data["publikasi"],
        )