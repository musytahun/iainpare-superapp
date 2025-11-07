# apps/lppm/services/kegiatan_service.py
from typing import Optional
from django.db import transaction
from apps.lppm.models import Kegiatan
from apps.people.models import Person
from apps.references.models import Tahun, Position
from datetime import date

def create_kegiatan(
        *, 
        name: str, 
        keterangan: Optional[str] = None,
        tanggal: Optional[date] = None,
        tempat: Optional[str] = None,
        status: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        penanggung_jawab_id: Optional[int] = None,
        ) -> Optional[Kegiatan]:
    try:
        with transaction.atomic():
            tahun = Tahun.objects.get(id=tahun_id) if tahun_id else None
            penanggung_jawab = Position.objects.get(id=penanggung_jawab_id) if penanggung_jawab_id else None

            # Buat objek kegiatan tanpa anggota dulu
            kegiatan = Kegiatan.objects.create(
                name=name,
                keterangan=keterangan,
                tanggal=tanggal,
                tempat=tempat,
                status=status,
                tahun=tahun,
                link=link,
                penanggung_jawab=penanggung_jawab,
            )

            return kegiatan

    except Exception as e:
        import traceback
        print("=== ERROR CREATE Kegiatan ===")
        print(traceback.format_exc())
        return None
    


def update_kegiatan(
        *, 
        id: int, 
        name: str, 
        keterangan: Optional[str] = None,
        tanggal: Optional[date] = None,
        tempat: Optional[str] = None,
        status: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        penanggung_jawab_id: Optional[int] = None,
        ) -> Optional[Kegiatan]:
    try:
        with transaction.atomic():
            kegiatan = Kegiatan.objects.get(id=id)

            if name is not None:
                kegiatan.name = name
            if keterangan is not None:
                kegiatan.keterangan = keterangan
            if tanggal is not None:
                kegiatan.tanggal = tanggal
            if tempat is not None:
                kegiatan.tempat = tempat
            if status is not None:
                kegiatan.status = status
            if link:
                kegiatan.link = link

            if tahun_id:
                kegiatan.tahun = Tahun.objects.get(id=tahun_id)
            if penanggung_jawab_id:
                kegiatan.tahun = Position.objects.get(id=penanggung_jawab_id)

            kegiatan.save()

            return kegiatan

    except Kegiatan.DoesNotExist:
        print(f"kegiatan with id={id} not found.")
        return None
    except Exception as e:
        print(f"Error updating kegiatan: {e}")
        return None



def delete_kegiatan(*, id: int) -> bool:
    try:
        with transaction.atomic():
            kegiatan = Kegiatan.objects.get(id=id)
            kegiatan.delete()
            return True

    except Kegiatan.DoesNotExist:
        print(f"kegiatan with id={id} not found.")
        return False
    except Exception as e:
        print(f"Error deleting kegiatan: {e}")
        return False


