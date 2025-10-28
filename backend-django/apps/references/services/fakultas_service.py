# apps/references/services/fakultas_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import Fakultas


def create_fakultas(*, code: str, name: str) -> Optional[Fakultas]:
    try:
        with transaction.atomic():
            fakultas = Fakultas.objects.create(
                code=code,
                name=name,
            )

            return fakultas

    except Exception as e:
        print(f"❌ Error creating fakultas: {e}")
        return None
    


def update_fakultas(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[Fakultas]:
    try:
        with transaction.atomic():
            fakultas = Fakultas.objects.get(id=id)

            if code is not None:
                fakultas.code = code
            if name is not None:
                fakultas.name = name

            fakultas.save()

            return fakultas

    except Fakultas.DoesNotExist:
        print(f"❌ fakultas with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating fakultas: {e}")
        return None



def delete_fakultas(*, id: int) -> bool:
    try:
        with transaction.atomic():
            fakultas = Fakultas.objects.get(id=id)
            fakultas.delete()
            return True

    except Fakultas.DoesNotExist:
        print(f"⚠️ fakultas with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting fakultas: {e}")
        return False

