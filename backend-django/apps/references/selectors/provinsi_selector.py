# apps/references/selectors/provinsi_selector.py
from typing import List
from apps.references.models import Provinsi


def get_provinsi() -> List[Provinsi]:
    return Provinsi.objects.all().order_by("name")

def get_provinsi_by_id(*, id: int):
    return Provinsi.objects.filter(pk=id).first()