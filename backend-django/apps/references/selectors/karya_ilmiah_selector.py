# apps/references/selectors/karya_ilmiah_selector.py
from typing import List
from apps.references.models import KaryaIlmiah


def get_karya_ilmiah() -> List[KaryaIlmiah]:
    return KaryaIlmiah.objects.all().order_by("name")

def get_karya_ilmiah_by_id(*, id: int):
    return KaryaIlmiah.objects.filter(pk=id).first()