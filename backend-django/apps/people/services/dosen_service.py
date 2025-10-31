# apps/people/services/dosen_service.py
from typing import List, Optional
from django.db import transaction
from apps.people.models import Person, Dosen
from apps.references.models import JabatanFungsional, PangkatGolongan, ProgramStudi, BidangKepakaran

from apps.people.selectors import dosen_selector
from apps.lppm.selectors import penelitian_selector, pengabdian_selector, publikasi_selector


def create_dosen(
        *, 
        name: Optional[str], 
        email: Optional[str], 
        nomor_hp: Optional[str], 
        alamat: Optional[str], 
        foto_profil: Optional[str], 
        nidn: Optional[str], 
        nip: Optional[str],
        gelar_depan: Optional[str], 
        gelar_belakang: Optional[str],
        jabatan_fungsional_id: Optional[int] = None,
        pangkat_golongan_id: Optional[int] = None,
        program_studi_id: Optional[int] = None,
        bidang_kepakaran_id: Optional[int] = None
    ) -> Optional[Dosen]:
    try:
        with transaction.atomic():
            jabatan_fungsional = JabatanFungsional.objects.get(id=jabatan_fungsional_id) if jabatan_fungsional_id else None
            pangkat_golongan = PangkatGolongan.objects.get(id=pangkat_golongan_id) if pangkat_golongan_id else None
            program_studi = ProgramStudi.objects.get(id=program_studi_id) if program_studi_id else None
            bidang_kepakaran = BidangKepakaran.objects.get(id=bidang_kepakaran_id) if bidang_kepakaran_id else None

            person = Person.objects.create(
                name=name,
                email=email,
                nomor_hp=nomor_hp,
                alamat=alamat,
                foto_profil=foto_profil,
            )

            dosen = Dosen.objects.create(
                person=person,
                nidn=nidn,
                nip=nip,
                gelar_depan=gelar_depan,
                gelar_belakang=gelar_belakang,
                jabatan_fungsional=jabatan_fungsional,
                pangkat_golongan=pangkat_golongan,
                program_studi=program_studi,
                bidang_kepakaran=bidang_kepakaran
            )

            return dosen

    except Exception as e:
        print(f"Error creating dosen: {e}")
        raise e
    


def update_dosen(
        *, 
        id: int, 
        name: Optional[str], 
        email: Optional[str], 
        nomor_hp: Optional[str], 
        alamat: Optional[str], 
        foto_profil: Optional[str], 
        nidn: Optional[str], 
        nip: Optional[str],
        gelar_depan: Optional[str], 
        gelar_belakang: Optional[str],
        jabatan_fungsional_id: Optional[int],
        pangkat_golongan_id: Optional[int],
        program_studi_id: Optional[int],
        bidang_kepakaran_id: Optional[int]
    ) -> Optional[Dosen]:
    try:
        with transaction.atomic():
            dosen = Dosen.objects.select_related("person").get(id=id)
            person = dosen.person

            jabatan_fungsional = JabatanFungsional.objects.get(id=jabatan_fungsional_id) if jabatan_fungsional_id else None
            pangkat_golongan = PangkatGolongan.objects.get(id=pangkat_golongan_id) if pangkat_golongan_id else None
            program_studi = ProgramStudi.objects.get(id=program_studi_id) if program_studi_id else None
            bidang_kepakaran = BidangKepakaran.objects.get(id=bidang_kepakaran_id) if bidang_kepakaran_id else None

            # update person fields
            if name is not None:
                person.name = name
            if email is not None:
                person.email = email
            if nomor_hp is not None:
                person.nomor_hp = nomor_hp
            if alamat is not None:
                person.alamat = alamat
            if foto_profil is not None:
                person.foto_profil = foto_profil
            person.save()

            # update dosen fields
            if nidn is not None:
                dosen.nidn = nidn
            if nip is not None:
                dosen.nip = nip
            if gelar_depan is not None:
                dosen.gelar_depan = gelar_depan
            if gelar_belakang is not None:
                dosen.gelar_belakang = gelar_belakang
            if jabatan_fungsional is not None:
                dosen.jabatan_fungsional = jabatan_fungsional
            if pangkat_golongan is not None:
                dosen.pangkat_golongan = pangkat_golongan
            if program_studi is not None:
                dosen.program_studi = program_studi
            if bidang_kepakaran is not None:
                dosen.bidang_kepakaran = bidang_kepakaran
            dosen.save()

            return dosen

    except Dosen.DoesNotExist:
        print(f"dosen with id={id} not found.")
        return None
    except Exception as e:
        print(f"Error updating dosen: {e}")
        return None



def delete_dosen(*, id: int) -> bool:
    try:
        with transaction.atomic():
            dosen = Dosen.objects.get(id=id)
            dosen.delete()

            person = dosen.person
            person.delete()

            return True

    except Dosen.DoesNotExist:
        print(f"dosen with id={id} not found.")
        return False
    except Exception as e:
        print(f"Error deleting dosen: {e}")
        return False



def get_dosen_with_lppm_detail(dosen_id: int):
    dosen = dosen_selector.get_dosen_by_id(dosen_id)
    penelitian = penelitian_selector.get_penelitian_by_dosen(dosen_id)
    pengabdian = pengabdian_selector.get_pengabdian_by_dosen(dosen_id)
    publikasi = publikasi_selector.get_publikasi_by_dosen(dosen_id)
    return {
        "dosen": dosen,
        "penelitian": penelitian,
        "pengabdian": pengabdian,
        "publikasi": publikasi,
    }
