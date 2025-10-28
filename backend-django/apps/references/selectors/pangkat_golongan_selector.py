# apps/references/selectors/pangkat_golongan_selector.py
from typing import List
from apps.references.models import PangkatGolongan


def get_pangkat_golongan() -> List[PangkatGolongan]:
    return PangkatGolongan.objects.all().order_by("name")

def get_pangkat_golongan_by_id(*, id: int):
    return PangkatGolongan.objects.filter(pk=id).first()