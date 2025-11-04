# apps/lppm/services/strategic_source_service.py
from typing import List, Optional
from django.db import transaction
from apps.lppm.models import StrategicSource


def create_strategic_source(*, code: str, name: str) -> Optional[StrategicSource]:
    try:
        with transaction.atomic():
            strategic_source = StrategicSource.objects.create(
                code=code,
                name=name,
            )

            return strategic_source

    except Exception as e:
        print(f"❌ Error creating strategic source: {e}")
        return None
    


def update_strategic_source(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[StrategicSource]:
    try:
        with transaction.atomic():
            strategic_source = StrategicSource.objects.get(id=id)

            if code is not None:
                strategic_source.code = code
            if name is not None:
                strategic_source.name = name

            strategic_source.save()

            return strategic_source

    except StrategicSource.DoesNotExist:
        print(f"❌ strategic source with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating strategic source: {e}")
        return None



def delete_strategic_source(*, id: int) -> bool:
    try:
        with transaction.atomic():
            strategic_source = StrategicSource.objects.get(id=id)
            strategic_source.delete()
            return True

    except StrategicSource.DoesNotExist:
        print(f"⚠️ strategic source with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting strategic source: {e}")
        return False

