# apps/references/services/jabatan_fungsional_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import JabatanFungsional


def create_jabatan_fungsional(*, code: str, name: str) -> Optional[JabatanFungsional]:
    try:
        with transaction.atomic():
            jabatan_fungsional = JabatanFungsional.objects.create(
                code=code,
                name=name,
            )

            return jabatan_fungsional

    except Exception as e:
        print(f"❌ Error creating jabatan fungsional: {e}")
        return None
    


def update_jabatan_fungsional(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[JabatanFungsional]:
    try:
        with transaction.atomic():
            jabatan_fungsional = JabatanFungsional.objects.get(id=id)

            if code is not None:
                jabatan_fungsional.code = code
            if name is not None:
                jabatan_fungsional.name = name

            jabatan_fungsional.save()

            return jabatan_fungsional

    except JabatanFungsional.DoesNotExist:
        print(f"❌ Jabatan Fungsional with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating jabatan fungsional: {e}")
        return None



def delete_jabatan_fungsional(*, id: int) -> bool:
    try:
        with transaction.atomic():
            jabatan_fungsional = JabatanFungsional.objects.get(id=id)
            jabatan_fungsional.delete()
            return True

    except JabatanFungsional.DoesNotExist:
        print(f"⚠️ Jabatan Fungsional with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting jabatan fungsional: {e}")
        return False

