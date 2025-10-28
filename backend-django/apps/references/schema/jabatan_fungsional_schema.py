# apps/references/schema/jabatan_fungsional_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class JabatanFungsionalQuery:

    @strawberry.field
    # @permission_required("jabatan_fungsional.view")
    def get_jabatan_fungsional(self, info: Info) -> List[JabatanFungsionalType]:
        return get_jabatan_fungsional()


@strawberry.type
class JabatanFungsionalMutation:

    @strawberry.mutation
    # @permission_required("jabatan_fungsional.create")
    def create_jabatan_fungsional(self, info: Info, code: str, name: str) -> Optional[JabatanFungsionalType]:
        jabatan_fungsional = create_jabatan_fungsional(code=code, name=name)
        return jabatan_fungsional

    @strawberry.mutation
    # @permission_required("jabatan_fungsional.update")
    def update_jabatan_fungsional(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[JabatanFungsionalType]:
        jabatan_fungsional = update_jabatan_fungsional(id=id, code=code, name=name)
        return jabatan_fungsional

    @strawberry.mutation
    # @permission_required("jabatan_fungsional.delete")
    def delete_jabatan_fungsional(self, info: Info, id: int) -> bool:
        return delete_jabatan_fungsional(id=id)