# apps/lppm/services/penelitian_service.py
from apps.lppm.selectors import penelitian_selector

def get_penelitian_for_dosen(dosen_id: int):
    return {
        "penelitian": penelitian_selector.get_penelitian_by_dosen(dosen_id),
    }