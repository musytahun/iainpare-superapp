# apps/lppm/services/penelitian_service.py
from decimal import Decimal
from typing import List, Optional
from django.db import transaction
from apps.lppm.models import Penelitian
from apps.lppm.selectors import penelitian_selector
from apps.people.models import Person
from apps.references.models import SumberDana, KelompokKeilmuan, JenisKolaborasi, Tahun

def create_penelitian(
        *, 
        judul: str, 
        keterangan: Optional[str] = None,
        jumlah_dana: Optional[Decimal] = None,
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        sumber_dana_id: Optional[int] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        jenis_kolaborasi_id: Optional[int] = None,
        tahun_id: Optional[int] = None
        ) -> Optional[Penelitian]:
    try:
        with transaction.atomic():
            ketua = Person.objects.get(id=ketua_id) if ketua_id else None
            sumber_dana = SumberDana.objects.get(id=sumber_dana_id) if sumber_dana_id else None
            kelompok_keilmuan = KelompokKeilmuan.objects.get(id=kelompok_keilmuan_id) if kelompok_keilmuan_id else None
            jenis_kolaborasi = JenisKolaborasi.objects.get(id=jenis_kolaborasi_id) if jenis_kolaborasi_id else None
            tahun = Tahun.objects.get(id=tahun_id) if tahun_id else None

            # Buat objek penelitian tanpa anggota dulu
            penelitian = Penelitian.objects.create(
                judul=judul,
                ketua=ketua,
                keterangan=keterangan,
                jumlah_dana=jumlah_dana,
                sumber_dana=sumber_dana,
                kelompok_keilmuan=kelompok_keilmuan,
                jenis_kolaborasi=jenis_kolaborasi,
                tahun=tahun
            )

            # Tambahkan anggota (ManyToMany)
            if anggota_ids:
                anggota_list = Person.objects.filter(id__in=anggota_ids)
                penelitian.anggota.set(anggota_list)
            else:
                penelitian.anggota.clear()

            return penelitian

    except Exception as e:
        import traceback
        print("=== ERROR CREATE PENELITIAN ===")
        print(traceback.format_exc())
        return None
    


def update_penelitian(
        *, 
        id: int, 
        judul: str, 
        keterangan: Optional[str] = None,
        jumlah_dana: Optional[Decimal] = None,
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        sumber_dana_id: Optional[int] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        jenis_kolaborasi_id: Optional[int] = None,
        tahun_id: Optional[int] = None
        ) -> Optional[Penelitian]:
    try:
        with transaction.atomic():
            penelitian = Penelitian.objects.get(id=id)

            if judul is not None:
                penelitian.judul = judul
            if keterangan is not None:
                penelitian.keterangan = keterangan
            if jumlah_dana is not None:
                penelitian.jumlah_dana = jumlah_dana

            if ketua_id:
                penelitian.ketua = Person.objects.get(id=ketua_id)
            if sumber_dana_id:
                penelitian.sumber_dana = SumberDana.objects.get(id=sumber_dana_id)
            if kelompok_keilmuan_id:
                penelitian.kelompok_keilmuan = KelompokKeilmuan.objects.get(id=kelompok_keilmuan_id)
            if jenis_kolaborasi_id:
                penelitian.jenis_kolaborasi = JenisKolaborasi.objects.get(id=jenis_kolaborasi_id)
            if tahun_id:
                penelitian.tahun = Tahun.objects.get(id=tahun_id)

            penelitian.save()

            # Update anggota peneliti (ManyToMany)
            if anggota_ids is not None:
                anggota_list = Person.objects.filter(id__in=anggota_ids)
                penelitian.anggota.set(anggota_list)

            return penelitian

    except Penelitian.DoesNotExist:
        print(f"penelitian with id={id} not found.")
        return None
    except Exception as e:
        print(f"Error updating penelitian: {e}")
        return None



def delete_penelitian(*, id: int) -> bool:
    try:
        with transaction.atomic():
            penelitian = Penelitian.objects.get(id=id)
            penelitian.delete()
            return True

    except Penelitian.DoesNotExist:
        print(f"penelitian with id={id} not found.")
        return False
    except Exception as e:
        print(f"Error deleting penelitian: {e}")
        return False



def get_penelitian_for_dosen(dosen_id: int):
    return {
        "penelitian": penelitian_selector.get_penelitian_by_dosen(dosen_id),
    }