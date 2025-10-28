# apps/references/schema/fakultas_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class FakultasQuery:

    @strawberry.field
    # @permission_required("fakultas.view")
    def get_fakultas(self, info: Info) -> List[FakultasType]:
        return get_fakultas()


@strawberry.type
class FakultasMutation:

    @strawberry.mutation
    # @permission_required("fakultas.create")
    def create_fakultas(self, info: Info, code: str, name: str) -> Optional[FakultasType]:
        fakultas = create_fakultas(code=code, name=name)
        return fakultas

    @strawberry.mutation
    # @permission_required("fakultas.update")
    def update_fakultas(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[FakultasType]:
        fakultas = update_fakultas(id=id, code=code, name=name)
        return fakultas

    @strawberry.mutation
    # @permission_required("fakultas.delete")
    def delete_fakultas(self, info: Info, id: int) -> bool:
        return delete_fakultas(id=id)