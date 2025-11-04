# apps/lppm/schema/strategic_source_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type
class StrategicSourceQuery:

    @strawberry.field
    # @permission_required("strategic_source.view")
    def get_strategic_source(self, info: Info) -> List[StrategicSourceType]:
        return get_strategic_source()


@strawberry.type
class StrategicSourceMutation:

    @strawberry.mutation
    # @permission_required("strategic_source.create")
    def create_strategic_source(self, info: Info, code: str, name: str) -> Optional[StrategicSourceType]:
        strategic_source = create_strategic_source(code=code, name=name)
        return strategic_source

    @strawberry.mutation
    # @permission_required("strategic_source.update")
    def update_strategic_source(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[StrategicSourceType]:
        strategic_source = update_strategic_source(id=id, code=code, name=name)
        return strategic_source

    @strawberry.mutation
    # @permission_required("strategic_source.delete")
    def delete_strategic_source(self, info: Info, id: int) -> bool:
        return delete_strategic_source(id=id)