# apps/lppm/selectors/strategic_action_selector.py
from typing import List
from apps.lppm.models import StrategicAction


def get_strategic_action() -> List[StrategicAction]:
    return StrategicAction.objects.all().order_by("name")

def get_strategic_action_by_id(*, id: int):
    return StrategicAction.objects.filter(pk=id).first()