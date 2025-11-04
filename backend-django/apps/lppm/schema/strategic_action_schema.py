# apps/lppm/schema/strategic_action_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type
class StrategicActionQuery:

    @strawberry.field
    # @permission_required("strategic_action.view")
    def get_strategic_action(self, info: Info) -> List[StrategicActionType]:
        return get_strategic_action()


# ----------------------------------------------------------------------------------


@strawberry.input
class AllYearInput:
    year: int
    target: Optional[int] = None
    current: Optional[int] = None


@strawberry.input
class YearlyDataInput:
    year: int
    value: Optional[int] = None
    

@strawberry.type
class StrategicActionMutation:

    @strawberry.mutation
    # @permission_required("strategic_action.create")
    def create_strategic_action(
        self, 
        info: Info, 
        code: str,
        name: str,
        strategic_objective_id: Optional[int] = None,
        current: Optional[int] = None,
        target: Optional[int] = None,
        unit: Optional[str] = None,
        all_year: Optional[List[AllYearInput]] = None,
        yearly_data: Optional[List[YearlyDataInput]] = None,
        strategic_source_id: Optional[int] = None,
        filter_keyword: Optional[str] = None,
        is_active: Optional[bool] = None
        ) -> Optional[StrategicActionType]:
        strategic_action = create_strategic_action(
            code=code, 
            name=name,
            strategic_objective_id=strategic_objective_id,
            current=current,
            target=target,
            unit=unit,
            all_year=[a.__dict__ for a in all_year] if all_year else None,
            yearly_data=[y.__dict__ for y in yearly_data] if yearly_data else None,
            strategic_source_id=strategic_source_id,
            filter_keyword=filter_keyword,
            is_active=is_active
        )
        return strategic_action

    @strawberry.mutation
    # @permission_required("strategic_action.update")
    def update_strategic_action(
        self, 
        info: Info, 
        id: int, 
        code: Optional[str] = None, 
        name: Optional[str] = None,
        strategic_objective_id: Optional[int] = None,
        current: Optional[int] = None,
        target: Optional[int] = None,
        unit: Optional[str] = None,
        all_year: Optional[List[AllYearInput]] = None,
        yearly_data: Optional[List[YearlyDataInput]] = None,
        strategic_source_id: Optional[int] = None,
        filter_keyword: Optional[str] = None,
        is_active: Optional[bool] = None
        ) -> Optional[StrategicActionType]:
        strategic_action = update_strategic_action(
            id=id, 
            code=code, 
            name=name,
            strategic_objective_id=strategic_objective_id,
            current=current,
            target=target,
            unit=unit,
            all_year=[a.__dict__ for a in all_year] if all_year else None,
            yearly_data=[y.__dict__ for y in yearly_data] if yearly_data else None,
            strategic_source_id=strategic_source_id,
            filter_keyword=filter_keyword,
            is_active=is_active
        )
        return strategic_action

    @strawberry.mutation
    # @permission_required("strategic_action.delete")
    def delete_strategic_action(self, info: Info, id: int) -> bool:
        return delete_strategic_action(id=id)
    

# ----------------------------------------------------------------------------------


    @strawberry.mutation
    def update_all_strategic_actions(self, info) -> bool:
        update_all_strategic_actions()
        return True