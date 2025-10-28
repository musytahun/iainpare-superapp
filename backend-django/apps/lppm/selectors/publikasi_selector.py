# apps/lppm/selectors/publikasi_selector.py
from apps.lppm.models import Penelitian, Pengabdian, Publikasi

def get_publikasi_by_dosen(dosen_id: int):
    return Publikasi.objects.filter(penulis__id=dosen_id)