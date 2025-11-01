# apps/references/selectors/indeksasi_selector.py
from typing import List
from apps.references.models import Indeksasi


def get_indeksasi() -> List[Indeksasi]:
    return Indeksasi.objects.all().order_by("name")

def get_indeksasi_by_id(*, id: int):
    return Indeksasi.objects.filter(pk=id).first()