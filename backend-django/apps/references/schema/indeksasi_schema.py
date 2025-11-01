# apps/references/schema/indeksasi_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class IndeksasiQuery:

    @strawberry.field
    # @permission_required("indeksasi.view")
    def get_indeksasi(self, info: Info) -> List[IndeksasiType]:
        return get_indeksasi()


@strawberry.type
class IndeksasiMutation:

    @strawberry.mutation
    # @permission_required("indeksasi.create")
    def create_indeksasi(self, info: Info, code: str, name: str) -> Optional[IndeksasiType]:
        indeksasi = create_indeksasi(code=code, name=name)
        return indeksasi

    @strawberry.mutation
    # @permission_required("indeksasi.update")
    def update_indeksasi(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[IndeksasiType]:
        indeksasi = update_indeksasi(id=id, code=code, name=name)
        return indeksasi

    @strawberry.mutation
    # @permission_required("indeksasi.delete")
    def delete_indeksasi(self, info: Info, id: int) -> bool:
        return delete_indeksasi(id=id)