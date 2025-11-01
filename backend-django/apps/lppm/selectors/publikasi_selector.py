# apps/lppm/selectors/publikasi_selector.py
from typing import List
from apps.lppm.models import Publikasi


def get_publikasi() -> List[Publikasi]:
    return Publikasi.objects.all().order_by("judul")

def get_publikasi_by_dosen(dosen_id: int):
    return Publikasi.objects.filter(penulis__id=dosen_id)