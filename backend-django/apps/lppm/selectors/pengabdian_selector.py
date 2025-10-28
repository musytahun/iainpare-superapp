# apps/lppm/selectors/pengabdian_selector.py
from apps.lppm.models import Penelitian, Pengabdian, Publikasi

def get_pengabdian_by_dosen(dosen_id: int):
    return Pengabdian.objects.filter(pengabdi__id=dosen_id)