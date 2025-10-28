# apps/references/selectors/tahun_selector.py
from typing import List
from apps.references.models import Tahun


def get_tahun() -> List[Tahun]:
    return Tahun.objects.all().order_by("name")

def get_tahun_by_id(*, id: int):
    return Tahun.objects.filter(pk=id).first()