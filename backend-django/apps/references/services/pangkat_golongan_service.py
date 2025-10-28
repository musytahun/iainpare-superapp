# apps/references/services/pangkat_golongan_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import PangkatGolongan


def create_pangkat_golongan(*, code: str, name: str) -> Optional[PangkatGolongan]:
    try:
        with transaction.atomic():
            pangkat_golongan = PangkatGolongan.objects.create(
                code=code,
                name=name,
            )

            return pangkat_golongan

    except Exception as e:
        print(f"❌ Error creating pangkat/golongan: {e}")
        return None
    


def update_pangkat_golongan(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[PangkatGolongan]:
    try:
        with transaction.atomic():
            pangkat_golongan = PangkatGolongan.objects.get(id=id)

            if code is not None:
                pangkat_golongan.code = code
            if name is not None:
                pangkat_golongan.name = name

            pangkat_golongan.save()

            return pangkat_golongan

    except PangkatGolongan.DoesNotExist:
        print(f"❌ pangkat/golongan with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating pangkat/golongan: {e}")
        return None



def delete_pangkat_golongan(*, id: int) -> bool:
    try:
        with transaction.atomic():
            pangkat_golongan = PangkatGolongan.objects.get(id=id)
            pangkat_golongan.delete()
            return True

    except PangkatGolongan.DoesNotExist:
        print(f"⚠️ pangkat/golongan with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting pangkat/golongan: {e}")
        return False

