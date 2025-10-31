# apps/references/services/jenis_kolaborasi_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import JenisKolaborasi


def create_jenis_kolaborasi(*, code: str, name: str) -> Optional[JenisKolaborasi]:
    try:
        with transaction.atomic():
            jenis_kolaborasi = JenisKolaborasi.objects.create(
                code=code,
                name=name,
            )

            return jenis_kolaborasi

    except Exception as e:
        print(f"❌ Error creating jenis kolaborasi: {e}")
        return None
    


def update_jenis_kolaborasi(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[JenisKolaborasi]:
    try:
        with transaction.atomic():
            jenis_kolaborasi = JenisKolaborasi.objects.get(id=id)

            if code is not None:
                jenis_kolaborasi.code = code
            if name is not None:
                jenis_kolaborasi.name = name

            jenis_kolaborasi.save()

            return jenis_kolaborasi

    except JenisKolaborasi.DoesNotExist:
        print(f"❌ jenis kolaborasi with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating jenis kolaborasi: {e}")
        return None



def delete_jenis_kolaborasi(*, id: int) -> bool:
    try:
        with transaction.atomic():
            jenis_kolaborasi = JenisKolaborasi.objects.get(id=id)
            jenis_kolaborasi.delete()
            return True

    except JenisKolaborasi.DoesNotExist:
        print(f"⚠️ jenis kolaborasi with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting jenis kolaborasi: {e}")
        return False

