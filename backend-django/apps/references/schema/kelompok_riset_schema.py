# apps/references/schema/kelompok_riset_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class KelompokRisetQuery:

    @strawberry.field
    # @permission_required("kelompok_riset.view")
    def get_kelompok_riset(self, info: Info) -> List[KelompokRisetType]:
        return get_kelompok_riset()


@strawberry.type
class KelompokRisetMutation:

    @strawberry.mutation
    # @permission_required("kelompok_riset.create")
    def create_kelompok_riset(self, info: Info, code: str, name: str) -> Optional[KelompokRisetType]:
        kelompok_riset = create_kelompok_riset(code=code, name=name)
        return kelompok_riset

    @strawberry.mutation
    # @permission_required("kelompok_riset.update")
    def update_kelompok_riset(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[KelompokRisetType]:
        kelompok_riset = update_kelompok_riset(id=id, code=code, name=name)
        return kelompok_riset

    @strawberry.mutation
    # @permission_required("kelompok_riset.delete")
    def delete_kelompok_riset(self, info: Info, id: int) -> bool:
        return delete_kelompok_riset(id=id)