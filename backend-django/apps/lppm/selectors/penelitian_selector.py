# apps/lppm/selectors/penelitian_selector.py
from apps.lppm.models import Penelitian, Pengabdian, Publikasi

def get_penelitian_by_dosen(dosen_id: int):
    return Penelitian.objects.filter(peneliti__id=dosen_id)