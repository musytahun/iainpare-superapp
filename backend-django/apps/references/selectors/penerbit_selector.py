# apps/references/selectors/penerbit_selector.py
from typing import List
from apps.references.models import Penerbit


def get_penerbit() -> List[Penerbit]:
    return Penerbit.objects.all().order_by("name")

def get_penerbit_by_id(*, id: int):
    return Penerbit.objects.filter(pk=id).first()