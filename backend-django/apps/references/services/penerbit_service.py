# apps/references/services/penerbit_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import Penerbit


def create_penerbit(*, code: str, name: str) -> Optional[Penerbit]:
    try:
        with transaction.atomic():
            penerbit = Penerbit.objects.create(
                code=code,
                name=name,
            )

            return penerbit

    except Exception as e:
        print(f"❌ Error creating penerbit: {e}")
        return None
    


def update_penerbit(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[Penerbit]:
    try:
        with transaction.atomic():
            penerbit = Penerbit.objects.get(id=id)

            if code is not None:
                penerbit.code = code
            if name is not None:
                penerbit.name = name

            penerbit.save()

            return penerbit

    except Penerbit.DoesNotExist:
        print(f"❌ penerbit with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating penerbit: {e}")
        return None



def delete_penerbit(*, id: int) -> bool:
    try:
        with transaction.atomic():
            penerbit = Penerbit.objects.get(id=id)
            penerbit.delete()
            return True

    except Penerbit.DoesNotExist:
        print(f"⚠️ penerbit with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting penerbit: {e}")
        return False

