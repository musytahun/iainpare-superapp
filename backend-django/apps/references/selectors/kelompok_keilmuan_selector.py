# apps/references/selectors/kelompok_keilmuan_selector.py
from typing import List
from apps.references.models import KelompokKeilmuan


def get_kelompok_keilmuan() -> List[KelompokKeilmuan]:
    return KelompokKeilmuan.objects.all().order_by("name")

def get_kelompok_keilmuan_by_id(*, id: int):
    return KelompokKeilmuan.objects.filter(pk=id).first()