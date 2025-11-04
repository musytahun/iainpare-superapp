# apps/lppm/services/strategic_objective_service.py
from typing import List, Optional
from django.db import transaction
from apps.lppm.models import StrategicObjective, StrategicGoal


def create_strategic_objective(
        *,
        code: str, 
        name: str, 
        strategic_goal_id: Optional[int] = None,
        is_active: Optional[bool] = None
    ) -> Optional[StrategicObjective]:
    try:
        with transaction.atomic():
            strategic_goal = StrategicGoal.objects.get(id=strategic_goal_id) if strategic_goal_id else None

            strategic_objective = StrategicObjective.objects.create(
                code=code,
                name=name,
                strategic_goal=strategic_goal,
                is_active=is_active
            )

            return strategic_objective

    except Exception as e:
        print(f"❌ Error creating strategic objective: {e}")
        return None
    


def update_strategic_objective(
        *, 
        id: int, 
        code: Optional[str] = None, 
        name: Optional[str] = None, 
        strategic_goal_id: Optional[int] = None,
        is_active: Optional[bool] = None
    ) -> Optional[StrategicObjective]:
    try:
        with transaction.atomic():
            strategic_objective = StrategicObjective.objects.get(id=id)

            if code is not None:
                strategic_objective.code = code
            if name is not None:
                strategic_objective.name = name
            if strategic_goal_id is not None:
                strategic_objective.strategic_goal = StrategicGoal.objects.get(id=strategic_goal_id)
            if is_active is not None:
                strategic_objective.is_active = is_active

            strategic_objective.save()

            return strategic_objective

    except StrategicObjective.DoesNotExist:
        print(f"❌ strategic objective with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating strategic objective: {e}")
        return None



def delete_strategic_objective(*, id: int) -> bool:
    try:
        with transaction.atomic():
            strategic_objective = StrategicObjective.objects.get(id=id)
            strategic_objective.delete()
            return True

    except StrategicObjective.DoesNotExist:
        print(f"⚠️ strategic objective with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting strategic objective: {e}")
        return False

