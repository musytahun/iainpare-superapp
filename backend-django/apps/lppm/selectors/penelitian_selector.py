# apps/lppm/selectors/penelitian_selector.py
from typing import List
from apps.lppm.models import Penelitian


def get_penelitian() -> List[Penelitian]:
    return Penelitian.objects.all().order_by("judul")

def get_penelitian_by_dosen(dosen_id: int):
    return Penelitian.objects.filter(peneliti__id=dosen_id)