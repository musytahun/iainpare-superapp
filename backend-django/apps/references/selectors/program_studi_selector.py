# apps/references/selectors/program_studi_selector.py
from typing import List
from apps.references.models import ProgramStudi


def get_program_studi() -> List[ProgramStudi]:
    return ProgramStudi.objects.select_related("fakultas").order_by("name")

def get_program_studi_by_id(*, id: int):
    return ProgramStudi.objects.filter(pk=id).first()