# apps/references/schema/position_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class PositionQuery:

    @strawberry.field
    # @permission_required("position.view")
    def get_position(self, info: Info) -> List[PositionType]:
        return get_position()


@strawberry.type
class PositionMutation:

    @strawberry.mutation
    # @permission_required("position.create")
    def create_position(
        self, 
        info: Info, 
        name: str,
        parent_id: Optional[int] = None,
        level: Optional[int] = None,
        description: Optional[str] = None,
    ) -> Optional[PositionType]:
        position = create_position(
            name=name, 
            parent_id=parent_id, 
            level=level, 
            description=description)
        return position

    @strawberry.mutation
    # @permission_required("position.update")
    def update_position(
        self, 
        info: Info, 
        id: int, 
        name: Optional[str] = None,
        parent_id: Optional[int] = None,
        level: Optional[int] = None,
        description: Optional[str] = None,
    ) -> Optional[PositionType]:
        position = update_position(
            id=id, 
            name=name,
            parent_id=parent_id,
            level=level,
            description=description,
        )
        return position

    @strawberry.mutation
    # @permission_required("position.delete")
    def delete_position(self, info: Info, id: int) -> bool:
        return delete_position(id=id)