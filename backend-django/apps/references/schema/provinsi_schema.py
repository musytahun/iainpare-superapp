# apps/references/schema/provinsi_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class ProvinsiQuery:

    @strawberry.field
    # @permission_required("provinsi.view")
    def get_provinsi(self, info: Info) -> List[ProvinsiType]:
        return get_provinsi()


@strawberry.type
class ProvinsiMutation:

    @strawberry.mutation
    # @permission_required("provinsi.create")
    def create_provinsi(self, info: Info, code: str, name: str) -> Optional[ProvinsiType]:
        provinsi = create_provinsi(code=code, name=name)
        return provinsi

    @strawberry.mutation
    # @permission_required("provinsi.update")
    def update_provinsi(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[ProvinsiType]:
        provinsi = update_provinsi(id=id, code=code, name=name)
        return provinsi

    @strawberry.mutation
    # @permission_required("provinsi.delete")
    def delete_provinsi(self, info: Info, id: int) -> bool:
        return delete_provinsi(id=id)