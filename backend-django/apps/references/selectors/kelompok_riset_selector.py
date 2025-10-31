# apps/references/selectors/kelompok_riset_selector.py
from typing import List
from apps.references.models import KelompokRiset


def get_kelompok_riset() -> List[KelompokRiset]:
    return KelompokRiset.objects.all().order_by("name")

def get_kelompok_riset_by_id(*, id: int):
    return KelompokRiset.objects.filter(pk=id).first()