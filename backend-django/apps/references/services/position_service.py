# apps/references/services/position_service.py
from typing import Optional
from django.db import transaction
from apps.references.models import Position


def create_position(
    *, 
    name: str,
    parent_id: Optional[Position] = None,
    level: Optional[int] = None,
    description: Optional[str] = None
) -> Optional[Position]:
    try:
        with transaction.atomic():
            position = Position.objects.create(
                name=name,
                parent_id=parent_id,
                level=level,
                description=description
            )

            return position

    except Exception as e:
        print(f"❌ Error creating position: {e}")
        return None
    


def update_position(
    *, 
    id: int, 
    name: Optional[str] = None,
    parent_id: Optional[Position] = None,
    level: Optional[int] = None,
    description: Optional[str] = None
) -> Optional[Position]:
    try:
        with transaction.atomic():
            position = Position.objects.get(id=id)

            if name is not None:
                position.name = name
            if parent_id is not None:
                position.parent_id = parent_id
            if level is not None:
                position.level = level
            if description is not None:
                position.description = description

            position.save()
            return position

    except Position.DoesNotExist:
        print(f"❌ position with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating position: {e}")
        return None



def delete_position(*, id: int) -> bool:
    try:
        with transaction.atomic():
            position = Position.objects.get(id=id)
            position.delete()
            return True

    except Position.DoesNotExist:
        print(f"⚠️ position with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting position: {e}")
        return False

