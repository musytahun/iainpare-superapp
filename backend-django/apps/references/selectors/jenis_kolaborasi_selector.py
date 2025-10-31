# apps/references/selectors/jenis_kolaborasi_selector.py
from typing import List
from apps.references.models import JenisKolaborasi


def get_jenis_kolaborasi() -> List[JenisKolaborasi]:
    return JenisKolaborasi.objects.all().order_by("name")

def get_jenis_kolaborasi_by_id(*, id: int):
    return JenisKolaborasi.objects.filter(pk=id).first()