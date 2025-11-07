# apps/references/selectors/position_selector.py
from typing import List
from apps.references.models import Position


def get_position() -> List[Position]:
    return Position.objects.all().order_by("name")
