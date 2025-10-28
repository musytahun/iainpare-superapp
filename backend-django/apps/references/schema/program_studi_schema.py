# apps/references/schema/program_studi_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class ProgramStudiQuery:

    @strawberry.field
    # @permission_required("program_studi.view")
    def get_program_studi(self, info: Info) -> List[ProgramStudiType]:
        return get_program_studi()


@strawberry.type
class ProgramStudiMutation:

    @strawberry.mutation
    # @permission_required("program_studi.create")
    def create_program_studi(self, info: Info, code: str, name: str, fakultas_id: Optional[int] = None) -> Optional[ProgramStudiType]:
        program_studi = create_program_studi(code=code, name=name, fakultas_id=fakultas_id)
        return program_studi

    @strawberry.mutation
    # @permission_required("program_studi.update")
    def update_program_studi(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None, fakultas_id: Optional[int] = None) -> Optional[ProgramStudiType]:
        program_studi = update_program_studi(id=id, code=code, name=name, fakultas_id=fakultas_id)
        return program_studi

    @strawberry.mutation
    # @permission_required("program_studi.delete")
    def delete_program_studi(self, info: Info, id: int) -> bool:
        return delete_program_studi(id=id)