# apps/references/services/karya_ilmiah_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import KaryaIlmiah


def create_karya_ilmiah(*, code: str, name: str) -> Optional[KaryaIlmiah]:
    try:
        with transaction.atomic():
            karya_ilmiah = KaryaIlmiah.objects.create(
                code=code,
                name=name,
            )

            return karya_ilmiah

    except Exception as e:
        print(f"❌ Error creating karya ilmiah: {e}")
        return None
    


def update_karya_ilmiah(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[KaryaIlmiah]:
    try:
        with transaction.atomic():
            karya_ilmiah = KaryaIlmiah.objects.get(id=id)

            if code is not None:
                karya_ilmiah.code = code
            if name is not None:
                karya_ilmiah.name = name

            karya_ilmiah.save()

            return karya_ilmiah

    except KaryaIlmiah.DoesNotExist:
        print(f"❌ karya ilmiah with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating karya ilmiah: {e}")
        return None



def delete_karya_ilmiah(*, id: int) -> bool:
    try:
        with transaction.atomic():
            karya_ilmiah = KaryaIlmiah.objects.get(id=id)
            karya_ilmiah.delete()
            return True

    except KaryaIlmiah.DoesNotExist:
        print(f"⚠️ karya ilmiah with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting karya ilmiah: {e}")
        return False

