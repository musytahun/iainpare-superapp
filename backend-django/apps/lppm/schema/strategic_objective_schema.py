# apps/lppm/schema/strategic_objective_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type
class StrategicObjectiveQuery:

    @strawberry.field
    # @permission_required("strategic_objective.view")
    def get_strategic_objective(self, info: Info) -> List[StrategicObjectiveType]:
        return get_strategic_objective()


@strawberry.type
class StrategicObjectiveMutation:

    @strawberry.mutation
    # @permission_required("strategic_objective.create")
    def create_strategic_objective(
        self, 
        info: Info, 
        code: str,
        name: str,
        strategic_goal_id: Optional[int] = None,
        is_active: Optional[bool] = None
        ) -> Optional[StrategicObjectiveType]:
        strategic_objective = create_strategic_objective(
            code=code, 
            name=name,
            strategic_goal_id=strategic_goal_id,
            is_active=is_active
        )
        return strategic_objective

    @strawberry.mutation
    # @permission_required("strategic_objective.update")
    def update_strategic_objective(
        self, 
        info: Info, 
        id: int, 
        code: Optional[str] = None, 
        name: Optional[str] = None,
        strategic_goal_id: Optional[int] = None,
        is_active: Optional[bool] = None
        ) -> Optional[StrategicObjectiveType]:
        strategic_objective = update_strategic_objective(
            id=id, 
            code=code, 
            name=name,
            strategic_goal_id=strategic_goal_id,
            is_active=is_active
        )
        return strategic_objective

    @strawberry.mutation
    # @permission_required("strategic_objective.delete")
    def delete_strategic_objective(self, info: Info, id: int) -> bool:
        return delete_strategic_objective(id=id)