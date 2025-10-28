# apps/references/services/program_studi_service.py
from typing import Optional
from django.db import transaction
from apps.references.models import ProgramStudi, Fakultas


@transaction.atomic
def create_program_studi(*, code: str, name: str, fakultas_id: Optional[int] = None) -> Optional[ProgramStudi]:
    try:
        fakultas = Fakultas.objects.get(id=fakultas_id) if fakultas_id else None

        program_studi = ProgramStudi.objects.create(
            code=code,
            name=name,
            fakultas=fakultas
        )
        return program_studi

    except Exception as e:
        print(f"❌ Error creating program studi: {e}")
        return None


@transaction.atomic
def update_program_studi(
    *,
    id: int,
    code: Optional[str] = None,
    name: Optional[str] = None,
    fakultas_id: Optional[int] = None
) -> Optional[ProgramStudi]:
    try:
        program_studi = ProgramStudi.objects.get(id=id)

        if code is not None:
            program_studi.code = code
        if name is not None:
            program_studi.name = name
        if fakultas_id is not None:
            program_studi.fakultas = Fakultas.objects.get(id=fakultas_id)

        program_studi.save()
        return program_studi

    except ProgramStudi.DoesNotExist:
        print(f"❌ Program studi dengan ID {id} tidak ditemukan.")
        return None
    except Exception as e:
        print(f"❌ Error updating program studi: {e}")
        return None


@transaction.atomic
def delete_program_studi(*, id: int) -> bool:
    try:
        program_studi = ProgramStudi.objects.get(id=id)
        program_studi.delete()
        return True

    except ProgramStudi.DoesNotExist:
        print(f"❌ Program studi dengan ID {id} tidak ditemukan.")
        return False
    except Exception as e:
        print(f"❌ Error deleting program studi: {e}")
        return False
