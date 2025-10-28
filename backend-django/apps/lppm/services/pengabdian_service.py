# apps/lppm/services/pengabdian_service.py
from apps.lppm.selectors import pengabdian_selector

def get_pengabdian_for_dosen(dosen_id: int):
    return {
        "pengabdian": pengabdian_selector.get_pengabdian_by_dosen(dosen_id),
    }