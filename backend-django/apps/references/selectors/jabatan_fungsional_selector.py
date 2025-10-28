# apps/references/selectors/jabatan_fungsional_selector.py
from typing import List
from apps.references.models import JabatanFungsional


def get_jabatan_fungsional() -> List[JabatanFungsional]:
    return JabatanFungsional.objects.all().order_by("name")

def get_jabatan_fungsional_by_id(*, id: int):
    return JabatanFungsional.objects.filter(pk=id).first()