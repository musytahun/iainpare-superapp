# apps/references/selectors/jenis_publikasi_selector.py
from typing import List
from apps.references.models import JenisPublikasi


def get_jenis_publikasi() -> List[JenisPublikasi]:
    return JenisPublikasi.objects.all().order_by("name")

def get_jenis_publikasi_by_id(*, id: int):
    return JenisPublikasi.objects.filter(pk=id).first()