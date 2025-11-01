# apps/references/schema/kelompok_keilmuan_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class KelompokKeilmuanQuery:

    @strawberry.field
    # @permission_required("kelompok_keilmuan.view")
    def get_kelompok_keilmuan(self, info: Info) -> List[KelompokKeilmuanType]:
        return get_kelompok_keilmuan()


@strawberry.type
class KelompokKeilmuanMutation:

    @strawberry.mutation
    # @permission_required("kelompok_keilmuan.create")
    def create_kelompok_keilmuan(self, info: Info, code: str, name: str) -> Optional[KelompokKeilmuanType]:
        kelompok_keilmuan = create_kelompok_keilmuan(code=code, name=name)
        return kelompok_keilmuan

    @strawberry.mutation
    # @permission_required("kelompok_keilmuan.update")
    def update_kelompok_keilmuan(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[KelompokKeilmuanType]:
        kelompok_keilmuan = update_kelompok_keilmuan(id=id, code=code, name=name)
        return kelompok_keilmuan

    @strawberry.mutation
    # @permission_required("kelompok_keilmuan.delete")
    def delete_kelompok_keilmuan(self, info: Info, id: int) -> bool:
        return delete_kelompok_keilmuan(id=id)