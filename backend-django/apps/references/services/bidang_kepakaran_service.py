# apps/references/services/bidang_kepakaran_service.py
from typing import List, Optional
from django.db import transaction
from apps.references.models import BidangKepakaran


def create_bidang_kepakaran(*, code: str, name: str) -> Optional[BidangKepakaran]:
    try:
        with transaction.atomic():
            bidang_kepakaran = BidangKepakaran.objects.create(
                code=code,
                name=name,
            )

            return bidang_kepakaran

    except Exception as e:
        print(f"❌ Error creating bidang kepakaran: {e}")
        return None
    


def update_bidang_kepakaran(*, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[BidangKepakaran]:
    try:
        with transaction.atomic():
            bidang_kepakaran = BidangKepakaran.objects.get(id=id)

            if code is not None:
                bidang_kepakaran.code = code
            if name is not None:
                bidang_kepakaran.name = name

            bidang_kepakaran.save()

            return bidang_kepakaran

    except BidangKepakaran.DoesNotExist:
        print(f"❌ bidang kepakaran with id={id} not found.")
        return None
    except Exception as e:
        print(f"❌ Error updating bidang kepakaran: {e}")
        return None



def delete_bidang_kepakaran(*, id: int) -> bool:
    try:
        with transaction.atomic():
            bidang_kepakaran = BidangKepakaran.objects.get(id=id)
            bidang_kepakaran.delete()
            return True

    except BidangKepakaran.DoesNotExist:
        print(f"⚠️ bidang kepakaran with id={id} not found.")
        return False
    except Exception as e:
        print(f"❌ Error deleting bidang kepakaran: {e}")
        return False

