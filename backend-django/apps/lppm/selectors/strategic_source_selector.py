# apps/lppm/selectors/strategic_source_selector.py
from typing import List
from apps.lppm.models import StrategicSource


def get_strategic_source() -> List[StrategicSource]:
    return StrategicSource.objects.all().order_by("name")

def get_strategic_source_by_id(*, id: int):
    return StrategicSource.objects.filter(pk=id).first()