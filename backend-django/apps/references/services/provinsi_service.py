# apps/references/services/provinsi_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import Provinsi


def create_provinsi(*, code: str, name: str) -> Optional[Provinsi]:
    try:
        with transaction.atomic():
            provinsi = Provinsi.objects.create(
                code=code,
                name=name,
            )

            return provinsi

    except Exception as e:
        print(f"❌ Error creating jabatan fungsional: {e}")
        return None
    


def update_provinsi(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[Provinsi]:
    try:
        with transaction.atomic():
            provinsi = Provinsi.objects.get(id=id)

            if code is not None:
                provinsi.code = code
            if name is not None:
                provinsi.name = name

            provinsi.save()

            return provinsi

    except Provinsi.DoesNotExist:
        print(f"❌ Jabatan Fungsional with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating jabatan fungsional: {e}")
        return None



def delete_provinsi(*, id: int) -> bool:
    try:
        with transaction.atomic():
            provinsi = Provinsi.objects.get(id=id)
            provinsi.delete()
            return True

    except Provinsi.DoesNotExist:
        print(f"⚠️ Jabatan Fungsional with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting jabatan fungsional: {e}")
        return False

