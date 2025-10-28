# apps/references/schema/pangkat_golongan_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class PangkatGolonganQuery:

    @strawberry.field
    # @permission_required("pangkat_golongan.view")
    def get_pangkat_golongan(self, info: Info) -> List[PangkatGolonganType]:
        return get_pangkat_golongan()


@strawberry.type
class PangkatGolonganMutation:

    @strawberry.mutation
    # @permission_required("pangkat_golongan.create")
    def create_pangkat_golongan(self, info: Info, code: str, name: str) -> Optional[PangkatGolonganType]:
        pangkat_golongan = create_pangkat_golongan(code=code, name=name)
        return pangkat_golongan

    @strawberry.mutation
    # @permission_required("pangkat_golongan.update")
    def update_pangkat_golongan(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[PangkatGolonganType]:
        pangkat_golongan = update_pangkat_golongan(id=id, code=code, name=name)
        return pangkat_golongan

    @strawberry.mutation
    # @permission_required("pangkat_golongan.delete")
    def delete_pangkat_golongan(self, info: Info, id: int) -> bool:
        return delete_pangkat_golongan(id=id)