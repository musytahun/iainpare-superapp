# apps/references/selectors/fakultas_selector.py
from typing import List
from apps.references.models import Fakultas


def get_fakultas() -> List[Fakultas]:
    return Fakultas.objects.all().order_by("name")

def get_fakultas_by_id(*, id: int):
    return Fakultas.objects.filter(pk=id).first()