# apps/lppm/services/publikasi_service.py
from decimal import Decimal
from typing import List, Optional
from django.db import transaction
from apps.lppm.models import Publikasi
from apps.lppm.selectors import publikasi_selector
from apps.people.models import Person
from apps.references.models import KelompokKeilmuan, Tahun, Indeksasi, Penerbit, KaryaIlmiah

def create_publikasi(
        *, 
        judul: str, 
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        keterangan: Optional[str] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        indeksasi_id: Optional[int] = None,
        penerbit_id: Optional[int] = None,
        no_regis: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        karya_ilmiah_id: Optional[int] = None
        ) -> Optional[Publikasi]:
    try:
        with transaction.atomic():
            ketua = Person.objects.get(id=ketua_id) if ketua_id else None
            kelompok_keilmuan = KelompokKeilmuan.objects.get(id=kelompok_keilmuan_id) if kelompok_keilmuan_id else None
            indeksasi = Indeksasi.objects.get(id=indeksasi_id) if indeksasi_id else None
            penerbit = Penerbit.objects.get(id=penerbit_id) if penerbit_id else None
            tahun = Tahun.objects.get(id=tahun_id) if tahun_id else None
            karya_ilmiah = KaryaIlmiah.objects.get(id=karya_ilmiah_id) if karya_ilmiah_id else None

            # Buat objek publikasi tanpa anggota dulu
            publikasi = Publikasi.objects.create(
                judul=judul,
                ketua=ketua,
                keterangan=keterangan,
                kelompok_keilmuan=kelompok_keilmuan,
                indeksasi=indeksasi,
                penerbit=penerbit,
                no_regis=no_regis,
                tahun=tahun,
                link=link,
                karya_ilmiah=karya_ilmiah
            )

            # Tambahkan anggota (ManyToMany)
            if anggota_ids:
                anggota_list = Person.objects.filter(id__in=anggota_ids)
                publikasi.anggota.set(anggota_list)
            else:
                publikasi.anggota.clear()

            return publikasi

    except Exception as e:
        import traceback
        print("=== ERROR CREATE PUBLIKASI ===")
        print(traceback.format_exc())
        return None
    


def update_publikasi(
        *, 
        id: int, 
        judul: str, 
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        keterangan: Optional[str] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        indeksasi_id: Optional[int] = None,
        penerbit_id: Optional[int] = None,
        no_regis: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        karya_ilmiah_id: Optional[int] = None
        ) -> Optional[Publikasi]:
    try:
        with transaction.atomic():
            publikasi = Publikasi.objects.get(id=id)

            if judul is not None:
                publikasi.judul = judul
            if keterangan is not None:
                publikasi.keterangan = keterangan
            if no_regis:
                publikasi.no_regis = no_regis
            if link:
                publikasi.link = link

            if ketua_id:
                publikasi.ketua = Person.objects.get(id=ketua_id)
            if kelompok_keilmuan_id:
                publikasi.kelompok_keilmuan = KelompokKeilmuan.objects.get(id=kelompok_keilmuan_id)
            if indeksasi_id:
                publikasi.indeksasi = Indeksasi.objects.get(id=indeksasi_id)
            if penerbit_id:
                publikasi.penerbit = Penerbit.objects.get(id=penerbit_id)
            if tahun_id:
                publikasi.tahun = Tahun.objects.get(id=tahun_id)
            if karya_ilmiah_id:
                publikasi.karya_ilmiah = KaryaIlmiah.objects.get(id=karya_ilmiah_id)

            publikasi.save()

            # Update anggota peneliti (ManyToMany)
            if anggota_ids is not None:
                anggota_list = Person.objects.filter(id__in=anggota_ids)
                publikasi.anggota.set(anggota_list)

            return publikasi

    except Publikasi.DoesNotExist:
        print(f"publikasi with id={id} not found.")
        return None
    except Exception as e:
        print(f"Error updating publikasi: {e}")
        return None



def delete_publikasi(*, id: int) -> bool:
    try:
        with transaction.atomic():
            publikasi = Publikasi.objects.get(id=id)
            publikasi.delete()
            return True

    except Publikasi.DoesNotExist:
        print(f"publikasi with id={id} not found.")
        return False
    except Exception as e:
        print(f"Error deleting publikasi: {e}")
        return False



def get_publikasi_for_dosen(dosen_id: int):
    return {
        "publikasi": publikasi_selector.get_publikasi_by_dosen(dosen_id),
    }