# apps/references/services/kelompok_riset_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import KelompokRiset


def create_kelompok_riset(*, code: str, name: str) -> Optional[KelompokRiset]:
    try:
        with transaction.atomic():
            kelompok_riset = KelompokRiset.objects.create(
                code=code,
                name=name,
            )

            return kelompok_riset

    except Exception as e:
        print(f"❌ Error creating kelompok riset: {e}")
        return None
    


def update_kelompok_riset(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[KelompokRiset]:
    try:
        with transaction.atomic():
            kelompok_riset = KelompokRiset.objects.get(id=id)

            if code is not None:
                kelompok_riset.code = code
            if name is not None:
                kelompok_riset.name = name

            kelompok_riset.save()

            return kelompok_riset

    except KelompokRiset.DoesNotExist:
        print(f"❌ kelompok riset with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating kelompok riset: {e}")
        return None



def delete_kelompok_riset(*, id: int) -> bool:
    try:
        with transaction.atomic():
            kelompok_riset = KelompokRiset.objects.get(id=id)
            kelompok_riset.delete()
            return True

    except KelompokRiset.DoesNotExist:
        print(f"⚠️ kelompok riset with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting kelompok riset: {e}")
        return False

