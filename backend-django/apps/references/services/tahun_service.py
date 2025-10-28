# apps/references/services/tahun_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import Tahun


def create_tahun(*, code: str, name: str) -> Optional[Tahun]:
    try:
        with transaction.atomic():
            tahun = Tahun.objects.create(
                code=code,
                name=name,
            )

            return tahun

    except Exception as e:
        print(f"❌ Error creating tahun: {e}")
        return None
    


def update_tahun(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[Tahun]:
    try:
        with transaction.atomic():
            tahun = Tahun.objects.get(id=id)

            if code is not None:
                tahun.code = code
            if name is not None:
                tahun.name = name

            tahun.save()

            return tahun

    except Tahun.DoesNotExist:
        print(f"❌ tahun with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating tahun: {e}")
        return None



def delete_tahun(*, id: int) -> bool:
    try:
        with transaction.atomic():
            tahun = Tahun.objects.get(id=id)
            tahun.delete()
            return True

    except Tahun.DoesNotExist:
        print(f"⚠️ tahun with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting tahun: {e}")
        return False

