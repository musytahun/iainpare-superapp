# apps/references/selectors/sumber_dana_selector.py
from typing import List
from apps.references.models import SumberDana


def get_sumber_dana() -> List[SumberDana]:
    return SumberDana.objects.all().order_by("name")

def get_sumber_dana_by_id(*, id: int):
    return SumberDana.objects.filter(pk=id).first()