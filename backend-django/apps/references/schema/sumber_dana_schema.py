# apps/references/schema/sumber_dana_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class SumberDanaQuery:

    @strawberry.field
    # @permission_required("sumber_dana.view")
    def get_sumber_dana(self, info: Info) -> List[SumberDanaType]:
        return get_sumber_dana()


@strawberry.type
class SumberDanaMutation:

    @strawberry.mutation
    # @permission_required("sumber_dana.create")
    def create_sumber_dana(self, info: Info, code: str, name: str) -> Optional[SumberDanaType]:
        sumber_dana = create_sumber_dana(code=code, name=name)
        return sumber_dana

    @strawberry.mutation
    # @permission_required("sumber_dana.update")
    def update_sumber_dana(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[SumberDanaType]:
        sumber_dana = update_sumber_dana(id=id, code=code, name=name)
        return sumber_dana

    @strawberry.mutation
    # @permission_required("sumber_dana.delete")
    def delete_sumber_dana(self, info: Info, id: int) -> bool:
        return delete_sumber_dana(id=id)