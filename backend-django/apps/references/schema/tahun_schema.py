# apps/references/schema/tahun_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class TahunQuery:

    @strawberry.field
    # @permission_required("tahun.view")
    def get_tahun(self, info: Info) -> List[TahunType]:
        return get_tahun()


@strawberry.type
class TahunMutation:

    @strawberry.mutation
    # @permission_required("tahun.create")
    def create_tahun(self, info: Info, code: str, name: str) -> Optional[TahunType]:
        tahun = create_tahun(code=code, name=name)
        return tahun

    @strawberry.mutation
    # @permission_required("tahun.update")
    def update_tahun(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[TahunType]:
        tahun = update_tahun(id=id, code=code, name=name)
        return tahun

    @strawberry.mutation
    # @permission_required("tahun.delete")
    def delete_tahun(self, info: Info, id: int) -> bool:
        return delete_tahun(id=id)