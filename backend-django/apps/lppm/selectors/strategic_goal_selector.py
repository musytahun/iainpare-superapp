# apps/lppm/selectors/strategic_goal_selector.py
from typing import List
from apps.lppm.models import StrategicGoal


def get_strategic_goal() -> List[StrategicGoal]:
    return StrategicGoal.objects.all().order_by("name")

def get_strategic_goal_by_id(*, id: int):
    return StrategicGoal.objects.filter(pk=id).first()