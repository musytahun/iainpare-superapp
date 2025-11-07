# apps/lppm/selectors/dokumen_selector.py
from typing import List
from apps.lppm.models import Dokumen


def get_dokumen() -> List[Dokumen]:
    return Dokumen.objects.all().order_by("name")