# apps/lppm/selectors/strategic_objective_selector.py
from typing import List
from apps.lppm.models import StrategicObjective


def get_strategic_objective() -> List[StrategicObjective]:
    return StrategicObjective.objects.all().order_by("name")

def get_strategic_objective_by_id(*, id: int):
    return StrategicObjective.objects.filter(pk=id).first()