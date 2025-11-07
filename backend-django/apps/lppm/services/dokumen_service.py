# apps/lppm/services/dokumen_service.py
from typing import Optional
from django.db import transaction
from apps.lppm.models import Dokumen
from apps.people.models import Person
from apps.references.models import Tahun

def create_dokumen(
        *, 
        name: str, 
        keterangan: Optional[str] = None,
        kriteria_terkait: Optional[str] = None,
        status: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        ) -> Optional[Dokumen]:
    try:
        with transaction.atomic():
            tahun = Tahun.objects.get(id=tahun_id) if tahun_id else None

            # Buat objek dokumen tanpa anggota dulu
            dokumen = Dokumen.objects.create(
                name=name,
                keterangan=keterangan,
                kriteria_terkait=kriteria_terkait,
                status=status,
                tahun=tahun,
                link=link,
            )

            return dokumen

    except Exception as e:
        import traceback
        print("=== ERROR CREATE DOKUMEN ===")
        print(traceback.format_exc())
        return None
    


def update_dokumen(
        *, 
        id: int, 
        name: str, 
        keterangan: Optional[str] = None,
        kriteria_terkait: Optional[str] = None,
        status: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        ) -> Optional[Dokumen]:
    try:
        with transaction.atomic():
            dokumen = Dokumen.objects.get(id=id)

            if name is not None:
                dokumen.name = name
            if keterangan is not None:
                dokumen.keterangan = keterangan
            if kriteria_terkait is not None:
                dokumen.kriteria_terkait = kriteria_terkait
            if status is not None:
                dokumen.status = status
            if link:
                dokumen.link = link

            if tahun_id:
                dokumen.tahun = Tahun.objects.get(id=tahun_id)

            dokumen.save()

            return dokumen

    except Dokumen.DoesNotExist:
        print(f"dokumen with id={id} not found.")
        return None
    except Exception as e:
        print(f"Error updating dokumen: {e}")
        return None



def delete_dokumen(*, id: int) -> bool:
    try:
        with transaction.atomic():
            dokumen = Dokumen.objects.get(id=id)
            dokumen.delete()
            return True

    except Dokumen.DoesNotExist:
        print(f"dokumen with id={id} not found.")
        return False
    except Exception as e:
        print(f"Error deleting dokumen: {e}")
        return False


