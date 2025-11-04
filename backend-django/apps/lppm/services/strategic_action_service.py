# apps/lppm/services/strategic_action_service.py
from typing import Any, Dict, List, Optional
from django.db import transaction
from apps.lppm.models import StrategicAction, StrategicObjective, StrategicSource


def create_strategic_action(
        *,
        code: str, 
        name: str, 
        strategic_objective_id: Optional[int] = None,
        current: Optional[int] = None,
        target: Optional[int] = None,
        unit: Optional[str] = None,
        all_year: Optional[List[Dict[str, Any]]] = None,
        yearly_data: Optional[List[Dict[str, Any]]] = None,
        strategic_source_id: Optional[int] = None,
        filter_keyword: Optional[str] = None,
        is_active: Optional[bool] = None
    ) -> Optional[StrategicAction]:
    try:
        with transaction.atomic():
            strategic_objective = StrategicObjective.objects.get(id=strategic_objective_id) if strategic_objective_id else None
            strategic_source = StrategicSource.objects.get(id=strategic_source_id) if strategic_source_id else None

            strategic_action = StrategicAction.objects.create(
                code=code,
                name=name,
                strategic_objective=strategic_objective,
                current=current,
                target=target,
                unit=unit,
                all_year=all_year or [],
                yearly_data=yearly_data or [],
                strategic_source=strategic_source,
                filter_keyword=filter_keyword,
                is_active=is_active if is_active is not None else True
            )

            return strategic_action

    except Exception as e:
        print(f"❌ Error creating strategic action: {e}")
        return None
    


def update_strategic_action(
        *, 
        id: int, 
        code: str, 
        name: str, 
        strategic_objective_id: Optional[int] = None,
        current: Optional[int] = None,
        target: Optional[int] = None,
        unit: Optional[str] = None,
        all_year: Optional[List[Dict[str, Any]]] = None,
        yearly_data: Optional[List[Dict[str, Any]]] = None,
        strategic_source_id: Optional[int] = None,
        filter_keyword: Optional[str] = None,
        is_active: Optional[bool] = None
    ) -> Optional[StrategicAction]:
    try:
        with transaction.atomic():
            strategic_action = StrategicAction.objects.get(id=id)

            if code is not None:
                strategic_action.code = code
            if name is not None:
                strategic_action.name = name
            if strategic_objective_id is not None:
                strategic_action.strategic_objective = StrategicObjective.objects.get(id=strategic_objective_id)
            if current is not None:
                strategic_action.current = current
            if target is not None:
                strategic_action.target = target
            if unit is not None:
                strategic_action.unit = unit
            if all_year is not None:
                strategic_action.all_year = all_year
            if yearly_data is not None:
                strategic_action.yearly_data = yearly_data
            if strategic_source_id is not None:
                strategic_action.strategic_source = StrategicSource.objects.get(id=strategic_source_id)
            if filter_keyword is not None:
                strategic_action.filter_keyword = filter_keyword
            if is_active is not None:
                strategic_action.is_active = is_active

            strategic_action.save()

            return strategic_action

    except StrategicAction.DoesNotExist:
        print(f"❌ strategic action with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating strategic action: {e}")
        return None



def delete_strategic_action(*, id: int) -> bool:
    try:
        with transaction.atomic():
            strategic_action = StrategicAction.objects.get(id=id)
            strategic_action.delete()
            return True

    except StrategicAction.DoesNotExist:
        print(f"⚠️ strategic action with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting strategic action: {e}")
        return False

