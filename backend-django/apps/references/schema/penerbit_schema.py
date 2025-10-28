# apps/references/schema/penerbit_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class PenerbitQuery:

    @strawberry.field
    # @permission_required("penerbit.view")
    def get_penerbit(self, info: Info) -> List[PenerbitType]:
        return get_penerbit()


@strawberry.type
class PenerbitMutation:

    @strawberry.mutation
    # @permission_required("penerbit.create")
    def create_penerbit(self, info: Info, code: str, name: str) -> Optional[PenerbitType]:
        penerbit = create_penerbit(code=code, name=name)
        return penerbit

    @strawberry.mutation
    # @permission_required("penerbit.update")
    def update_penerbit(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[PenerbitType]:
        penerbit = update_penerbit(id=id, code=code, name=name)
        return penerbit

    @strawberry.mutation
    # @permission_required("penerbit.delete")
    def delete_penerbit(self, info: Info, id: int) -> bool:
        return delete_penerbit(id=id)