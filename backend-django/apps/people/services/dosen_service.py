# apps/people/services/dosen_service.py
from apps.people.selectors import dosen_selector
from apps.lppm.selectors import penelitian_selector, pengabdian_selector, publikasi_selector

def get_dosen_with_lppm_detail(dosen_id: int):
    dosen = dosen_selector.get_dosen_by_id(dosen_id)
    penelitian = penelitian_selector.get_penelitian_by_dosen(dosen_id)
    pengabdian = pengabdian_selector.get_pengabdian_by_dosen(dosen_id)
    publikasi = publikasi_selector.get_publikasi_by_dosen(dosen_id)
    return {
        "dosen": dosen,
        "penelitian": penelitian,
        "pengabdian": pengabdian,
        "publikasi": publikasi,
    }
