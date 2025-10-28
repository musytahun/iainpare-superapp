# apps/lppm/services/publikasi_service.py
from apps.lppm.selectors import publikasi_selector

def get_publikasi_for_dosen(dosen_id: int):
    return {
        "publikasi": publikasi_selector.get_publikasi_by_dosen(dosen_id),
    }