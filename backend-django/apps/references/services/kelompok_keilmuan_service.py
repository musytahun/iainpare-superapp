# apps/references/services/kelompok_keilmuan_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import KelompokKeilmuan


def create_kelompok_keilmuan(*, code: str, name: str) -> Optional[KelompokKeilmuan]:
    try:
        with transaction.atomic():
            kelompok_keilmuan = KelompokKeilmuan.objects.create(
                code=code,
                name=name,
            )

            return kelompok_keilmuan

    except Exception as e:
        print(f"❌ Error creating kelompok keilmuan: {e}")
        return None
    


def update_kelompok_keilmuan(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[KelompokKeilmuan]:
    try:
        with transaction.atomic():
            kelompok_keilmuan = KelompokKeilmuan.objects.get(id=id)

            if code is not None:
                kelompok_keilmuan.code = code
            if name is not None:
                kelompok_keilmuan.name = name

            kelompok_keilmuan.save()

            return kelompok_keilmuan

    except KelompokKeilmuan.DoesNotExist:
        print(f"❌ kelompok keilmuan with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating kelompok keilmuan: {e}")
        return None



def delete_kelompok_keilmuan(*, id: int) -> bool:
    try:
        with transaction.atomic():
            kelompok_keilmuan = KelompokKeilmuan.objects.get(id=id)
            kelompok_keilmuan.delete()
            return True

    except KelompokKeilmuan.DoesNotExist:
        print(f"⚠️ kelompok keilmuan with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting kelompok keilmuan: {e}")
        return False

