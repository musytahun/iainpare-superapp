# apps/lppm/services/pengabdian_service.py
from decimal import Decimal
from typing import List, Optional
from django.db import transaction
from apps.lppm.models import Pengabdian
from apps.lppm.selectors import pengabdian_selector
from apps.people.models import Person
from apps.references.models import SumberDana, KelompokKeilmuan, JenisKolaborasi, Tahun, KabupatenKota

def create_pengabdian(
        *, 
        judul: str, 
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        keterangan: Optional[str] = None,
        jumlah_dana: Optional[Decimal] = None,
        sumber_dana_id: Optional[int] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        jenis_kolaborasi_id: Optional[int] = None,
        tahun_id: Optional[int] = None,
        lokasi_id: Optional[int] = None
        ) -> Optional[Pengabdian]:
    try:
        with transaction.atomic():
            ketua = Person.objects.get(id=ketua_id) if ketua_id else None
            sumber_dana = SumberDana.objects.get(id=sumber_dana_id) if sumber_dana_id else None
            kelompok_keilmuan = KelompokKeilmuan.objects.get(id=kelompok_keilmuan_id) if kelompok_keilmuan_id else None
            jenis_kolaborasi = JenisKolaborasi.objects.get(id=jenis_kolaborasi_id) if jenis_kolaborasi_id else None
            tahun = Tahun.objects.get(id=tahun_id) if tahun_id else None
            lokasi = KabupatenKota.objects.get(id=lokasi_id) if lokasi_id else None

            # Buat objek pengabdian tanpa anggota dulu
            pengabdian = Pengabdian.objects.create(
                judul=judul,
                ketua=ketua,
                keterangan=keterangan,
                jumlah_dana=jumlah_dana,
                sumber_dana=sumber_dana,
                kelompok_keilmuan=kelompok_keilmuan,
                jenis_kolaborasi=jenis_kolaborasi,
                tahun=tahun,
                lokasi=lokasi
            )

            # Tambahkan anggota (ManyToMany)
            if anggota_ids:
                anggota_list = Person.objects.filter(id__in=anggota_ids)
                pengabdian.anggota.set(anggota_list)
            else:
                pengabdian.anggota.clear()

            return pengabdian

    except Exception as e:
        import traceback
        print("=== ERROR CREATE PENGABDIAN ===")
        print(traceback.format_exc())
        return None
    


def update_pengabdian(
        *, 
        id: int, 
        judul: str, 
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        keterangan: Optional[str] = None,
        jumlah_dana: Optional[Decimal] = None,
        sumber_dana_id: Optional[int] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        jenis_kolaborasi_id: Optional[int] = None,
        tahun_id: Optional[int] = None,
        lokasi_id: Optional[int] = None
        ) -> Optional[Pengabdian]:
    try:
        with transaction.atomic():
            pengabdian = Pengabdian.objects.get(id=id)

            if judul is not None:
                pengabdian.judul = judul
            if keterangan is not None:
                pengabdian.keterangan = keterangan
            if jumlah_dana is not None:
                pengabdian.jumlah_dana = jumlah_dana

            if ketua_id:
                pengabdian.ketua = Person.objects.get(id=ketua_id)
            if sumber_dana_id:
                pengabdian.sumber_dana = SumberDana.objects.get(id=sumber_dana_id)
            if kelompok_keilmuan_id:
                pengabdian.kelompok_keilmuan = KelompokKeilmuan.objects.get(id=kelompok_keilmuan_id)
            if jenis_kolaborasi_id:
                pengabdian.jenis_kolaborasi = JenisKolaborasi.objects.get(id=jenis_kolaborasi_id)
            if tahun_id:
                pengabdian.tahun = Tahun.objects.get(id=tahun_id)
            if lokasi_id:
                pengabdian.lokasi = KabupatenKota.objects.get(id=lokasi_id)

            pengabdian.save()

            # Update anggota peneliti (ManyToMany)
            if anggota_ids is not None:
                anggota_list = Person.objects.filter(id__in=anggota_ids)
                pengabdian.anggota.set(anggota_list)

            return pengabdian

    except Pengabdian.DoesNotExist:
        print(f"pengabdian with id={id} not found.")
        return None
    except Exception as e:
        print(f"Error updating pengabdian: {e}")
        return None



def delete_pengabdian(*, id: int) -> bool:
    try:
        with transaction.atomic():
            pengabdian = Pengabdian.objects.get(id=id)
            pengabdian.delete()
            return True

    except Pengabdian.DoesNotExist:
        print(f"pengabdian with id={id} not found.")
        return False
    except Exception as e:
        print(f"Error deleting pengabdian: {e}")
        return False



def get_pengabdian_for_dosen(dosen_id: int):
    return {
        "pengabdian": pengabdian_selector.get_pengabdian_by_dosen(dosen_id),
    }