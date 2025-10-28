# apps/references/services/sumber_dana_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import SumberDana


def create_sumber_dana(*, code: str, name: str) -> Optional[SumberDana]:
    try:
        with transaction.atomic():
            sumber_dana = SumberDana.objects.create(
                code=code,
                name=name,
            )

            return sumber_dana

    except Exception as e:
        print(f"❌ Error creating jabatan fungsional: {e}")
        return None
    


def update_sumber_dana(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[SumberDana]:
    try:
        with transaction.atomic():
            sumber_dana = SumberDana.objects.get(id=id)

            if code is not None:
                sumber_dana.code = code
            if name is not None:
                sumber_dana.name = name

            sumber_dana.save()

            return sumber_dana

    except SumberDana.DoesNotExist:
        print(f"❌ Jabatan Fungsional with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating jabatan fungsional: {e}")
        return None



def delete_sumber_dana(*, id: int) -> bool:
    try:
        with transaction.atomic():
            sumber_dana = SumberDana.objects.get(id=id)
            sumber_dana.delete()
            return True

    except SumberDana.DoesNotExist:
        print(f"⚠️ Jabatan Fungsional with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting jabatan fungsional: {e}")
        return False

