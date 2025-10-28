# apps/references/selectors/kabupaten_kota_selector.py
from typing import List
from apps.references.models import KabupatenKota


def get_kabupaten_kota() -> List[KabupatenKota]:
    return KabupatenKota.objects.select_related("provinsi").order_by("name")

def get_kabupaten_kota_by_id(*, id: int):
    return KabupatenKota.objects.filter(pk=id).first()