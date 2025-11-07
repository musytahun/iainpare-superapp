# apps/lppm/selectors/kegiatan_selector.py
from typing import List
from apps.lppm.models import Kegiatan


def get_kegiatan() -> List[Kegiatan]:
    return Kegiatan.objects.all().order_by("name")