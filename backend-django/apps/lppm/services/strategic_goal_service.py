# apps/lppm/services/strategic_goal_service.py
from typing import List, Optional
from django.db import transaction
from apps.lppm.models import StrategicGoal


def create_strategic_goal(
        *,
        code: str, 
        name: str, 
        is_active: Optional[bool] = None,
        year_start: Optional[int] = None,
        year_end: Optional[int] = None
    ) -> Optional[StrategicGoal]:
    try:
        with transaction.atomic():
            strategic_goal = StrategicGoal.objects.create(
                code=code,
                name=name,
                is_active=is_active,
                year_start=year_start,
                year_end=year_end
            )

            return strategic_goal

    except Exception as e:
        print(f"❌ Error creating strategic goal: {e}")
        return None
    


def update_strategic_goal(
        *, 
        id: int, 
        code: Optional[str] = None, 
        name: Optional[str] = None, 
        is_active: Optional[bool] = None,
        year_start: Optional[int] = None,
        year_end: Optional[int] = None
    ) -> Optional[StrategicGoal]:
    try:
        with transaction.atomic():
            strategic_goal = StrategicGoal.objects.get(id=id)

            if code is not None:
                strategic_goal.code = code
            if name is not None:
                strategic_goal.name = name
            if is_active is not None:
                strategic_goal.is_active = is_active
            if year_start is not None:
                strategic_goal.year_start = year_start
            if year_end is not None:
                strategic_goal.year_end = year_end

            strategic_goal.save()

            return strategic_goal

    except StrategicGoal.DoesNotExist:
        print(f"❌ strategic goal with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating strategic goal: {e}")
        return None



def delete_strategic_goal(*, id: int) -> bool:
    try:
        with transaction.atomic():
            strategic_goal = StrategicGoal.objects.get(id=id)
            strategic_goal.delete()
            return True

    except StrategicGoal.DoesNotExist:
        print(f"⚠️ strategic goal with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting strategic goal: {e}")
        return False

