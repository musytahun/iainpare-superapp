# apps/references/services/indeksasi_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import Indeksasi


def create_indeksasi(*, code: str, name: str) -> Optional[Indeksasi]:
    try:
        with transaction.atomic():
            indeksasi = Indeksasi.objects.create(
                code=code,
                name=name,
            )

            return indeksasi

    except Exception as e:
        print(f"❌ Error creating jenis publikasi: {e}")
        return None
    


def update_indeksasi(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[Indeksasi]:
    try:
        with transaction.atomic():
            indeksasi = Indeksasi.objects.get(id=id)

            if code is not None:
                indeksasi.code = code
            if name is not None:
                indeksasi.name = name

            indeksasi.save()

            return indeksasi

    except Indeksasi.DoesNotExist:
        print(f"❌ jenis publikasi with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating jenis publikasi: {e}")
        return None



def delete_indeksasi(*, id: int) -> bool:
    try:
        with transaction.atomic():
            indeksasi = Indeksasi.objects.get(id=id)
            indeksasi.delete()
            return True

    except Indeksasi.DoesNotExist:
        print(f"⚠️ jenis publikasi with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting jenis publikasi: {e}")
        return False

