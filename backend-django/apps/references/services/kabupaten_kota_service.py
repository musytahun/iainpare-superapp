# apps/references/services/kabupaten_kota_service.py
from typing import Optional
from django.db import transaction
from apps.references.models import KabupatenKota, Provinsi


@transaction.atomic
def create_kabupaten_kota(*, code: str, name: str, provinsi_id: Optional[int] = None) -> Optional[KabupatenKota]:
    try:
        provinsi = Provinsi.objects.get(id=provinsi_id) if provinsi_id else None

        kabupaten_kota = KabupatenKota.objects.create(
            code=code,
            name=name,
            provinsi=provinsi
        )
        return kabupaten_kota

    except Exception as e:
        print(f"❌ Error creating program studi: {e}")
        return None


@transaction.atomic
def update_kabupaten_kota(
    *,
    id: int,
    code: Optional[str] = None,
    name: Optional[str] = None,
    provinsi_id: Optional[int] = None
) -> Optional[KabupatenKota]:
    try:
        kabupaten_kota = KabupatenKota.objects.get(id=id)

        if code is not None:
            kabupaten_kota.code = code
        if name is not None:
            kabupaten_kota.name = name
        if provinsi_id is not None:
            kabupaten_kota.provinsi = Provinsi.objects.get(id=provinsi_id)

        kabupaten_kota.save()
        return kabupaten_kota

    except KabupatenKota.DoesNotExist:
        print(f"❌ Program studi dengan ID {id} tidak ditemukan.")
        return None
    except Exception as e:
        print(f"❌ Error updating program studi: {e}")
        return None


@transaction.atomic
def delete_kabupaten_kota(*, id: int) -> bool:
    try:
        kabupaten_kota = KabupatenKota.objects.get(id=id)
        kabupaten_kota.delete()
        return True

    except KabupatenKota.DoesNotExist:
        print(f"❌ Program studi dengan ID {id} tidak ditemukan.")
        return False
    except Exception as e:
        print(f"❌ Error deleting program studi: {e}")
        return False
