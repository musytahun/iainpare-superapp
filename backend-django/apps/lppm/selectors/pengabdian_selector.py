# apps/lppm/selectors/pengabdian_selector.py
from typing import List
from apps.lppm.models import Pengabdian


def get_pengabdian() -> List[Pengabdian]:
    return Pengabdian.objects.all().order_by("judul")

def get_pengabdian_by_dosen(dosen_id: int):
    return Pengabdian.objects.filter(pengabdi__id=dosen_id)