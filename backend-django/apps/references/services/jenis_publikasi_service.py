# apps/references/services/jenis_publikasi_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import JenisPublikasi


def create_jenis_publikasi(*, code: str, name: str) -> Optional[JenisPublikasi]:
    try:
        with transaction.atomic():
            jenis_publikasi = JenisPublikasi.objects.create(
                code=code,
                name=name,
            )

            return jenis_publikasi

    except Exception as e:
        print(f"❌ Error creating jenis publikasi: {e}")
        return None
    


def update_jenis_publikasi(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[JenisPublikasi]:
    try:
        with transaction.atomic():
            jenis_publikasi = JenisPublikasi.objects.get(id=id)

            if code is not None:
                jenis_publikasi.code = code
            if name is not None:
                jenis_publikasi.name = name

            jenis_publikasi.save()

            return jenis_publikasi

    except JenisPublikasi.DoesNotExist:
        print(f"❌ jenis publikasi with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating jenis publikasi: {e}")
        return None



def delete_jenis_publikasi(*, id: int) -> bool:
    try:
        with transaction.atomic():
            jenis_publikasi = JenisPublikasi.objects.get(id=id)
            jenis_publikasi.delete()
            return True

    except JenisPublikasi.DoesNotExist:
        print(f"⚠️ jenis publikasi with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting jenis publikasi: {e}")
        return False

