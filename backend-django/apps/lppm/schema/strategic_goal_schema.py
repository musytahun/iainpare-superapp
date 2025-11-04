# apps/lppm/schema/strategic_goal_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type
class StrategicGoalQuery:

    @strawberry.field
    # @permission_required("strategic_goal.view")
    def get_strategic_goal(self, info: Info) -> List[StrategicGoalType]:
        return get_strategic_goal()


@strawberry.type
class StrategicGoalMutation:

    @strawberry.mutation
    # @permission_required("strategic_goal.create")
    def create_strategic_goal(
        self, 
        info: Info, 
        code: str,
        name: str,
        is_active: Optional[bool] = None,
        year_start: Optional[int] = None,
        year_end: Optional[int] = None
        ) -> Optional[StrategicGoalType]:
        strategic_goal = create_strategic_goal(
            code=code, 
            name=name,
            is_active=is_active,
            year_start=year_start,
            year_end=year_end
        )
        return strategic_goal

    @strawberry.mutation
    # @permission_required("strategic_goal.update")
    def update_strategic_goal(
        self, 
        info: Info, 
        id: int, 
        code: Optional[str] = None, 
        name: Optional[str] = None,
        is_active: Optional[bool] = None,
        year_start: Optional[int] = None,
        year_end: Optional[int] = None
        ) -> Optional[StrategicGoalType]:
        strategic_goal = update_strategic_goal(
            id=id, 
            code=code, 
            name=name,
            is_active=is_active,
            year_start=year_start,
            year_end=year_end
        )
        return strategic_goal

    @strawberry.mutation
    # @permission_required("strategic_goal.delete")
    def delete_strategic_goal(self, info: Info, id: int) -> bool:
        return delete_strategic_goal(id=id)